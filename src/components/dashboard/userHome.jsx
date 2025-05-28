import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const UserHome = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Bienvenido, Cliente</h2>
      <p className="dashboard-description">Consulta tus reservas y explora los hoteles disponibles para tu próxima estancia.</p>
      
      <div className="client-options">
        <Link to="/hotel" className="client-button">
          Ver Hoteles Disponibles
        </Link>
        
        <Link to="/reservation" className="client-button">
          Mis Reservaciones
        </Link>
        
        <Link to="/mi-perfil" className="client-button">
          Editar Mi Perfil
        </Link>
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px', borderRadius: '12px', background: 'rgba(33, 150, 243, 0.1)', border: '1px solid #38f9d7' }}>
        <h3 style={{ color: '#43e97b', marginBottom: '10px' }}>Ofertas Especiales</h3>
        <p>¡Descubre nuestras promociones exclusivas para tus próximas vacaciones!</p>
      </div>
    </div>
  );
};

export default UserHome;