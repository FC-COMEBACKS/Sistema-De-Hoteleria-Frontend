import React, { useState } from 'react';
import { Login, Register } from '../../components';
import './authPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Iniciar Sesión' : 'Registro'}</h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Acceda a su cuenta para gestionar reservas' 
              : 'Cree una cuenta para disfrutar de nuestros servicios'}
          </p>
        </div>
        
        <div className="auth-form-wrapper">
          {isLogin ? (
            <Login switchAuthHandler={handleAuthPageToggle} />
          ) : (
            <Register switchAuthHandler={handleAuthPageToggle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
