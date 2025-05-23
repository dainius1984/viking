import React, { useState, useEffect } from 'react';
import EnhancedAlert from './Alert';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [showError, setShowError] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    errors: {
      email: '',
      password: ''
    }
  });

  // This effect ensures the error message stays visible
  useEffect(() => {
    if (showError) {
      // Force the component to stay mounted for a moment
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email jest wymagany';
    if (!re.test(email)) return 'Nieprawidłowy format emaila';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Hasło jest wymagane';
    if (password.length < 6) return 'Hasło musi mieć minimum 6 znaków';
    return '';
  };

  // Handle alert dismissal
  const handleDismissAlert = () => {
    setNotification({ type: '', message: '' });
    setShowError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear any existing notifications
    setNotification({ type: '', message: '' });
    setShowError(false);

    // Validate form fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setFormData(prev => ({
      ...prev,
      errors: {
        email: emailError,
        password: passwordError
      }
    }));

    // If there are validation errors, don't proceed
    if (emailError || passwordError) return;

    setLoginLoading(true);
    
    try {
      // Attempt to login with autoRedirect set to false
      const result = await login(formData.email, formData.password, false);
      
      if (result.success) {
        // Store login success in sessionStorage for AccountPage to show message
        sessionStorage.setItem('loginSuccess', 'true');
        sessionStorage.setItem('loginTime', Date.now().toString());
        
        // Small delay before navigation to ensure state updates are complete
        setTimeout(() => {
          navigate('/account');
        }, 100);
      } else {
        // Handle different error cases
        let errorMessage = 'Nieprawidłowe dane logowania. Sprawdź email i hasło.';
        
        if (result.error?.toLowerCase().includes('invalid credentials')) {
          errorMessage = 'Nieprawidłowe dane logowania. Sprawdź email i hasło.';
        } else if (result.error?.toLowerCase().includes('user not found')) {
          errorMessage = 'Nie znaleziono użytkownika o podanym adresie email.';
        } else if (result.error?.toLowerCase().includes('incorrect password')) {
          errorMessage = 'Nieprawidłowe hasło. Spróbuj ponownie.';
        }

        // Set the error notification and make sure it stays visible
        setNotification({
          type: 'error',
          message: errorMessage
        });
        setShowError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification({
        type: 'error',
        message: 'Wystąpił błąd podczas logowania. Sprawdź połączenie internetowe i spróbuj ponownie.'
      });
      setShowError(true);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm max-w-xl mx-auto w-full relative">
      <h2 className="text-xl sm:text-2xl text-green-800 mb-4 sm:mb-6 text-center font-semibold">
        Zaloguj się
      </h2>
      
      {/* Properly use the EnhancedAlert component */}
      <div className="mb-6 min-h-[60px]">
        {notification.message && (
          <EnhancedAlert
            type={notification.type}
            message={notification.message}
            duration={5000}
            onDismiss={handleDismissAlert}
          />
        )}
      </div>

      <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 sm:gap-2">
          <label className="text-sm sm:text-base text-gray-700 font-medium">
            Email
          </label>
          <input 
            type="email" 
            className={`p-2.5 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none transition-colors ${
              formData.errors.email 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-800'
            }`}
            value={formData.email}
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value,
              errors: { ...formData.errors, email: '' }
            })}
            disabled={loginLoading}
            required
          />
          {formData.errors.email && (
            <span className="text-red-500 text-xs sm:text-sm mt-1">
              {formData.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 sm:gap-2">
          <label className="text-sm sm:text-base text-gray-700 font-medium">
            Hasło
          </label>
          <input 
            type="password"
            className={`p-2.5 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none transition-colors ${
              formData.errors.password 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-800'
            }`}
            value={formData.password}
            onChange={(e) => setFormData({
              ...formData,
              password: e.target.value,
              errors: { ...formData.errors, password: '' }
            })}
            disabled={loginLoading}
            required
          />
          {formData.errors.password && (
            <span className="text-red-500 text-xs sm:text-sm mt-1">
              {formData.errors.password}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox"
            id="rememberMe"
            className="w-4 h-4 accent-green-800"
            checked={formData.rememberMe}
            onChange={(e) => setFormData({
              ...formData,
              rememberMe: e.target.checked
            })}
            disabled={loginLoading}
          />
          <label htmlFor="rememberMe" className="text-sm sm:text-base text-gray-600">
            Zapamiętaj mnie
          </label>
        </div>

        <button 
          type="submit" 
          className="bg-green-800 hover:bg-green-900 text-white py-3 sm:py-3.5 px-4 rounded-md text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none w-full sm:w-auto mt-2"
          disabled={loginLoading}
        >
          {loginLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Logowanie...
            </span>
          ) : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;