export const validateName = (name) => {
  // Puedes ajustar la validación según tus reglas
  const regex = /^[a-zA-Z\s]{3,30}$/;
  return regex.test(name);
};

export const validateNameMessage = 'El nombre debe tener entre 3 y 30 letras y solo puede contener letras y espacios.';