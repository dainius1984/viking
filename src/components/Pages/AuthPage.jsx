import React from 'react';
import { useAuth } from '../AuthContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';

const AuthPage = () => {
  const { login, register } = useAuth();

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-5 my-6 sm:my-10">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 my-6 sm:my-10">
    <LoginForm login={login} />
    <RegisterForm register={register} />
  </div>
</div>
      <Footer />
    </>
  );
};

export default AuthPage;