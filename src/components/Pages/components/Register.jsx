import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnhancedAlert from './Alert';

const RegisterForm = ({ register }) => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    errors: {
      email: '',
      password: '',
      name: ''
    }
  });

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

  const validateName = (name) => {
    if (!name) return 'Imię jest wymagane';
    if (name.length < 2) return 'Imię musi mieć minimum 2 znaki';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setNotification({ type: '', message: '' });

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const nameError = validateName(formData.name);

    setFormData(prev => ({
      ...prev,
      errors: {
        email: emailError,
        password: passwordError,
        name: nameError
      }
    }));

    if (emailError || passwordError || nameError) return;

    setRegisterLoading(true);
    
    try {
      const result = await register(
        formData.email,
        formData.password,
        formData.name
      );
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Konto zostało utworzone pomyślnie! Witamy w naszym sklepie. Zaraz zostaniesz przekierowany.'
        });
      } else {
        let errorMessage = 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.';
        
        if (result.error?.toLowerCase().includes('email already exists')) {
          errorMessage = 'Konto z tym adresem email już istnieje. Użyj innego adresu lub zaloguj się.';
        } else if (result.error?.toLowerCase().includes('invalid email')) {
          errorMessage = 'Podany adres email jest nieprawidłowy.';
        } else if (result.error?.toLowerCase().includes('password')) {
          errorMessage = 'Hasło nie spełnia wymagań bezpieczeństwa. Użyj minimum 6 znaków.';
        } else if (result.error?.toLowerCase().includes('name')) {
          errorMessage = 'Podane imię jest nieprawidłowe.';
        }

        setNotification({
          type: 'error',
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setNotification({
        type: 'error',
        message: 'Wystąpił problem z połączeniem. Sprawdź internet i spróbuj ponownie.'
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm max-w-xl mx-auto w-full">
      <h2 className="text-xl sm:text-2xl text-green-800 mb-4 sm:mb-6 text-center font-semibold">
        Zarejestruj się
      </h2>
      
      <EnhancedAlert 
        type={notification.type} 
        message={notification.message}
        onDismiss={() => setNotification({ type: '', message: '' })}
      />

      <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 sm:gap-2">
          <label className="text-sm sm:text-base text-gray-700 font-medium">
            Imię
          </label>
          <input 
            type="text"
            className={`p-2.5 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none transition-colors ${
              formData.errors.name 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-green-800'
            }`}
            value={formData.name}
            onChange={(e) => setFormData({
              ...formData,
              name: e.target.value,
              errors: { ...formData.errors, name: '' }
            })}
            disabled={registerLoading}
            required
          />
          {formData.errors.name && (
            <span className="text-red-500 text-xs sm:text-sm mt-1">
              {formData.errors.name}
            </span>
          )}
        </div>

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
            disabled={registerLoading}
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
            disabled={registerLoading}
            required
          />
          {formData.errors.password && (
            <span className="text-red-500 text-xs sm:text-sm mt-1">
              {formData.errors.password}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Twoje dane osobowe zostaną użyte do obsługi twojej wizyty na
          naszej stronie, zarządzania dostępem do twojego konta i dla
          innych celów o których mówi nasza {' '}
          <Link 
            to="/policy" 
            className="text-green-800 hover:text-green-900 underline"
          >
            polityka prywatności
          </Link>.
        </p>

        <button 
          type="submit" 
          className="bg-green-800 hover:bg-green-900 text-white py-3 sm:py-3.5 px-4 rounded-md text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none w-full sm:w-auto mt-2"
          disabled={registerLoading}
        >
          {registerLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Rejestracja...
            </span>
          ) : 'Zarejestruj się'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;