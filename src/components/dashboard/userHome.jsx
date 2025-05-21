import React from "react";
import { useUserDetails } from "../../shared/hooks/useUserDetails";

const UserHome = () => {
  const { logout } = useUserDetails();

  return (
    <div>
      <h2>Inicio de Cliente</h2>
      <p>Consulta tus reservas y explora hoteles disponibles.</p>
      <button onClick={logout} className="button" style={{ background: "#d32f2f" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserHome;