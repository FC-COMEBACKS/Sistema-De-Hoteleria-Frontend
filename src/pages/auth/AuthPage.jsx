import React, { useState } from 'react';
import { Login, Register } from '../../components';
import './authPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="left-section">
        {isLogin ? (
          <Login switchAuthHandler={handleAuthPageToggle} />
        ) : (
          <Register switchAuthHandler={handleAuthPageToggle} />
        )}
      </div>
      <div className="right-section">
        {/* Aquí puedes poner un logo o imagen si quieres */}
      </div>
    </div>
  );
};

export default AuthPage;
