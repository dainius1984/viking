import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setError('');

    try {
      console.log("Login attempt with:", loginForm.email);
      const result = await login(loginForm.email, loginForm.password);
      console.log("Login result:", result);
      if (result.success) {
        const redirectToCart = localStorage.getItem('redirectToCart');
        if (redirectToCart) {
          localStorage.removeItem('redirectToCart');
          navigate('/koszyk');
        } else {
          navigate('/account');
        }
      } else {
        setError(result.error || 'Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Login error details:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
    setLoading(false);
  };

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="auth-container">
        <div className="auth-sections">
          <div className="auth-section">
            <h2>Zaloguj się</h2>
            {error && <div className="auth-error">{error}</div>}
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({
                    ...loginForm,
                    email: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hasło</label>
                <input 
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({
                    ...loginForm,
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-checkbox">
                <input 
                  type="checkbox"
                  id="rememberMe"
                  checked={loginForm.rememberMe}
                  onChange={(e) => setLoginForm({
                    ...loginForm,
                    rememberMe: e.target.checked
                  })}
                />
                <label htmlFor="rememberMe">Zapamiętaj mnie</label>
              </div>
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Logowanie...' : 'Zaloguj się'}
              </button>
            </form>
          </div>

          <div className="auth-section">
            <h2>Zarejestruj się</h2>
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label>Imię</label>
                <input 
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({
                    ...registerForm,
                    name: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({
                    ...registerForm,
                    email: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hasło</label>
                <input 
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({
                    ...registerForm,
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <p className="privacy-info">
                Twoje dane osobowe zostaną użyte do obsługi twojej wizyty na
                naszej stronie, zarządzania dostępem do twojego konta i dla
                innych celów o których mówi nasza polityka prywatności.
              </p>
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Rejestracja...' : 'Zarejestruj się'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
};

export default AuthPage;