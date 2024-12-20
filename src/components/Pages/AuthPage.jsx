import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoginLoading(true);
    setError('');

    try {
      const result = await login(loginForm.email, loginForm.password);
      if (result.success) {
        const redirectToCart = localStorage.getItem('redirectToCart');
        if (redirectToCart) {
          localStorage.removeItem('redirectToCart');
          navigate('/koszyk');
        } else {
          navigate('/account');
        }
      } else {
        setError(result.error || 'Błąd logowania. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRegisterLoading(true);
    setError('');

    try {
      const result = await register(
        registerForm.email,
        registerForm.password,
        registerForm.name
      );
      if (result.success) {
        const redirectToCart = localStorage.getItem('redirectToCart');
        if (redirectToCart) {
          localStorage.removeItem('redirectToCart');
          navigate('/koszyk');
        } else {
          navigate('/account');
        }
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto px-5 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {/* Login Section */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl text-green-800 mb-6 text-center">Zaloguj się</h2>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 font-medium">Email</label>
                <input 
                  type="email" 
                  className="p-3 border border-gray-200 rounded-md text-sm focus:border-green-800 focus:outline-none transition-colors"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({
                    ...loginForm,
                    email: e.target.value
                  })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 font-medium">Hasło</label>
                <input 
                  type="password"
                  className="p-3 border border-gray-200 rounded-md text-sm focus:border-green-800 focus:outline-none transition-colors"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({
                    ...loginForm,
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 accent-green-800"
                  checked={loginForm.rememberMe}
                  onChange={(e) => setLoginForm({
                    ...loginForm,
                    rememberMe: e.target.checked
                  })}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Zapamiętaj mnie
                </label>
              </div>
              <button 
                type="submit" 
                className="bg-green-800 hover:bg-green-900 text-white py-3.5 px-4 rounded-md text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loginLoading}
              >
                {loginLoading ? 'Logowanie...' : 'Zaloguj się'}
              </button>
            </form>
          </div>

          {/* Register Section */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl text-green-800 mb-6 text-center">Zarejestruj się</h2>
            <form className="flex flex-col gap-5" onSubmit={handleRegister}>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 font-medium">Imię</label>
                <input 
                  type="text"
                  className="p-3 border border-gray-200 rounded-md text-sm focus:border-green-800 focus:outline-none transition-colors"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({
                    ...registerForm,
                    name: e.target.value
                  })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 font-medium">Email</label>
                <input 
                  type="email"
                  className="p-3 border border-gray-200 rounded-md text-sm focus:border-green-800 focus:outline-none transition-colors"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({
                    ...registerForm,
                    email: e.target.value
                  })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 font-medium">Hasło</label>
                <input 
                  type="password"
                  className="p-3 border border-gray-200 rounded-md text-sm focus:border-green-800 focus:outline-none transition-colors"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({
                    ...registerForm,
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed -mt-2">
                Twoje dane osobowe zostaną użyte do obsługi twojej wizyty na
                naszej stronie, zarządzania dostępem do twojego konta i dla
                innych celów o których mówi nasza polityka prywatności.
              </p>
              <button 
                type="submit" 
                className="bg-green-800 hover:bg-green-900 text-white py-3.5 px-4 rounded-md text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={registerLoading}
              >
                {registerLoading ? 'Rejestracja...' : 'Zarejestruj się'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;