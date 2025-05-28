import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  validateConfirmPassword,
  validateConfirmPasswordMessage,
  validateEmail,
  validateEmailMessage,
  validatePassword,
  validatePasswordMessage,
  validateName,
  validateNameMessage,
} from "../shared/validators";
import { Input } from "./Input";
import { useRegister } from "../shared/hooks/useRegister";
import "./register.css";

const Register = ({ switchAuthHandler }) => {
  const { register, isLoading } = useRegister();

  const [formState, setFormState] = useState({
    name: {
      value: "",
      isValid: false,
      showError: false,
    },
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
    passwordConfirm: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
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
      case "name":
        isValid = validateName(value);
        break;
      case "passwordConfirm":
        isValid = validateConfirmPassword(formState.password.value, value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    register(formState.name.value, formState.email.value, formState.password.value);
  }
  const isSubmitDisabled =
    isLoading ||
    !formState.name.isValid ||
    !formState.email.isValid ||
    !formState.password.isValid ||
    !formState.passwordConfirm.isValid;return (
    <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleRegister(e); }}>
      <h1>Crear Cuenta</h1>
      
      <Input
        field="name"
        label="Nombre"
        value={formState.name.value}
        onChangeHandler={handleInputValueChange}
        type="text"
        onBlurHandler={handleInputValidationOnBlur}
        showErrorMessage={formState.name.showError}
        validationMessage={validateNameMessage}
      />
      <Input
        field="email"
        label="Email"
        value={formState.email.value}
        onChangeHandler={handleInputValueChange}
        type="text"
        onBlurHandler={handleInputValidationOnBlur}
        showErrorMessage={formState.email.showError}
        validationMessage={validateEmailMessage}
      />
      <Input
        field="password"
        label="Contraseña"
        value={formState.password.value}
        onChangeHandler={handleInputValueChange}
        type="password"
        onBlurHandler={handleInputValidationOnBlur}
        showErrorMessage={formState.password.showError}
        validationMessage={validatePasswordMessage}
      />
      <Input
        field="passwordConfirm"
        label="Confirmar contraseña"
        value={formState.passwordConfirm.value}
        onChangeHandler={handleInputValueChange}
        type="password"
        onBlurHandler={handleInputValidationOnBlur}
        showErrorMessage={formState.passwordConfirm.showError}
        validationMessage={validateConfirmPasswordMessage}
      />
      <button type="submit" disabled={isSubmitDisabled} className="button">
        {isLoading ? "Procesando..." : "Registrarse"}
      </button>
      <span onClick={switchAuthHandler} className="span">
        ¿Ya tienes una cuenta? Inicia sesión
      </span>
    </form>
  );
};

Register.proptypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};

export default Register;