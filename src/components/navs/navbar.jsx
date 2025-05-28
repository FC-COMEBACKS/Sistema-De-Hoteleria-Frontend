import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useUserDetails } from "../../shared/hooks/useUserDetails";

const Navbar = () => {
  const { isLogged, logout, userDetails } = useUserDetails();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Hotel FC COMEBACKS
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to="/hotel" onClick={() => setMenuOpen(false)}>Hoteles</Link>
        <Link to="/reservation" onClick={() => setMenuOpen(false)}>Reservaciones</Link>
        <Link to="/room" onClick={() => setMenuOpen(false)}>Habitaciones</Link>
        {mounted && !isLogged && (
          <Link to="/auth" className="auth-link" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
        )}
        {mounted && isLogged && userDetails?.role !== "CLIENT_ROLE" && (
          <Link to="/user" onClick={() => setMenuOpen(false)}>Usuarios</Link>
        )}
      </div>

      <div className="navbar-profile">
        {mounted && isLogged && (
          <Link to="/mi-perfil" className="profile-link" onClick={() => setMenuOpen(false)}>Mi Perfil</Link>
        )}
        {mounted && isLogged && (
          <button className="button" onClick={logout}>
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;