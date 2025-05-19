import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  validateEmail,
  validatePassword,
  validateEmailMessage,
  validatePasswordMessage,
} from "../shared/validators";
import { Input } from "./Input";
import { useLogin } from "../shared/hooks/useLogin";

const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    email: { value: "", isValid: false, showError: false },
    password: { value: "", isValid: false, showError: false },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], value },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], isValid, showError: !isValid },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.email.value, formState.password.value);
  };

  const isSubmitDisabled =
    isLoading || !formState.email.isValid || !formState.password.isValid;

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Iniciar Sesión</h1>
      <Input
        field="email"
        label="Ingresa tu email"
        value={formState.email.value}
        onChangeHandler={handleInputValueChange}
        type="text"
        onBlurHandler={handleInputValidationOnBlur}
        showErrorMessage={formState.email.showError}
        validationMessage={validateEmailMessage}
      />
      <Input
        field="password"
        label="Ingresa tu contraseña"
        value={formState.password.value}
        onChangeHandler={handleInputValueChange}
        type="password"
        onBlurHandler={handleInputValidationOnBlur}
        showErrorMessage={formState.password.showError}
        validationMessage={validatePasswordMessage}
      />
      <button type="submit" disabled={isSubmitDisabled} className="button">
        Login
      </button>
      <span onClick={switchAuthHandler} className="span" style={{ cursor: "pointer" }}>
        ¿No tienes cuenta aún? ¡Regístrate acá!
      </span>
    </form>
  );
};

Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};

export default Login;