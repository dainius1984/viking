import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationAlert from './Alert';

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    errors: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setFormData(prev => ({
      ...prev,
      errors: {
        email: emailError,
        password: passwordError
      }
    }));

    if (emailError || passwordError) return;

    setLoginLoading(true);
    setNotification({ type: '', message: '' });

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Zalogowano pomyślnie! Przekierowywanie...'
        });
        
        const redirectToCart = localStorage.getItem('redirectToCart');
        setTimeout(() => {
          if (redirectToCart) {
            localStorage.removeItem('redirectToCart');
            navigate('/koszyk');
          } else {
            navigate('/account');
          }
        }, 1500);
      } else {
        // Handle different error scenarios
        let errorMessage = 'Nieprawidłowe dane logowania. Sprawdź email i hasło.';
        
        if (result.error?.toLowerCase().includes('invalid credentials')) {
          errorMessage = 'Nieprawidłowe dane logowania. Sprawdź email i hasło.';
        } else if (result.error?.toLowerCase().includes('user not found')) {
          errorMessage = 'Nie znaleziono użytkownika o podanym adresie email.';
        } else if (result.error?.toLowerCase().includes('incorrect password')) {
          errorMessage = 'Nieprawidłowe hasło. Spróbuj ponownie.';
        }

        setNotification({
          type: 'error',
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification({
        type: 'error',
        message: 'Wystąpił błąd podczas logowania. Sprawdź połączenie internetowe i spróbuj ponownie.'
      });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm max-w-xl mx-auto w-full">
      <h2 className="text-xl sm:text-2xl text-green-800 mb-4 sm:mb-6 text-center font-semibold">
        Zaloguj się
      </h2>
      
      <NotificationAlert 
        type={notification.type} 
        message={notification.message} 
      />

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
          />
          <label htmlFor="rememberMe" className="text-sm sm:text-base text-gray-600">
            Zapamiętaj mnie
          </label>
        </div>

        <button 
          type="submit" 
          className="bg-green-800 hover:bg-green-900 text-white py-3 sm:py-3.5 px-4 rounded-md text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto mt-2"
          disabled={loginLoading}
        >
          {loginLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;