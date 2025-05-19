import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useUserDetails } from "../../shared/hooks/useUserDetails";

const Navbar = () => {
  const { isLogged, logout } = useUserDetails();

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/hotel">Hoteles</Link>
      <Link to="/reservation">Reservaciones</Link>
      <Link to="/room">Habitaciones</Link>
      {!isLogged ? (
        <Link to="/auth">Iniciar Sesión</Link>
      ) : (
        <button className="button" onClick={logout} style={{ background: "#d32f2f" }}>
          Cerrar Sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;