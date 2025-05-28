import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const AdminOverview = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Panel Principal del Administrador</h2>
      <p className="dashboard-description">Gestiona hoteles, usuarios y reservas desde aquí. Controla todos los aspectos de tu sistema hotelero fácilmente.</p>
      
      <div className="admin-panel">
        <Link to="/hotel" style={{ textDecoration: 'none' }}>
          <div className="admin-card">
            <div className="admin-card-icon">🏨</div>
            <h3 className="admin-card-title">Hoteles</h3>
            <div className="admin-card-count">10</div>
            <p>Administrar hoteles</p>
          </div>
        </Link>
        
        <Link to="/room" style={{ textDecoration: 'none' }}>
          <div className="admin-card">
            <div className="admin-card-icon">🛏️</div>
            <h3 className="admin-card-title">Habitaciones</h3>
            <div className="admin-card-count">42</div>
            <p>Gestionar habitaciones</p>
          </div>
        </Link>
        
        <Link to="/reservation" style={{ textDecoration: 'none' }}>
          <div className="admin-card">
            <div className="admin-card-icon">📅</div>
            <h3 className="admin-card-title">Reservas</h3>
            <div className="admin-card-count">18</div>
            <p>Ver reservaciones</p>
          </div>
        </Link>
        
        <Link to="/user" style={{ textDecoration: 'none' }}>
          <div className="admin-card">
            <div className="admin-card-icon">👥</div>
            <h3 className="admin-card-title">Usuarios</h3>
            <div className="admin-card-count">25</div>
            <p>Administrar usuarios</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminOverview;