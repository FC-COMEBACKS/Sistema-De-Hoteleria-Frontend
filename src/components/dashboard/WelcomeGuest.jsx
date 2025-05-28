import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const WelcomeGuest = () => (
  <div className="dashboard-container">
    <h2 className="dashboard-title">¡Hola visitante!</h2>
    <div className="welcome-message">
      <p className="dashboard-description">
        Por favor inicia sesión o regístrate para acceder a todas las funciones del sistema hotelero. 
        Disfruta de una experiencia personalizada y todas las ventajas de nuestro servicio.
      </p>
    </div>
    
    <div className="welcome-actions">
      <Link to="/auth">
        <button className="welcome-button welcome-login">Iniciar Sesión</button>
      </Link>
      <Link to="/auth">
        <button className="welcome-button welcome-register">Registrarse</button>
      </Link>
    </div>
    
    <div style={{ marginTop: '40px', padding: '20px', borderRadius: '12px', background: 'rgba(33, 150, 243, 0.1)', border: '1px solid #38f9d7' }}>
      <h3 style={{ color: '#43e97b', marginBottom: '10px' }}>Descubre Nuestros Servicios</h3>
      <p>Ofrecemos una amplia gama de hoteles con las mejores instalaciones y servicios personalizados para que disfrutes de una estancia inolvidable.</p>
    </div>
  </div>
);

export default WelcomeGuest;