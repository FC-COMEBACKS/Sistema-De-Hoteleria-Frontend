import React from "react";
import { useUserDetails } from "../../shared/hooks/useUserDetails";

const AdminOverview = () => {
  const { logout } = useUserDetails();

  return (
    <div>
      <h2>Panel Principal del Administrador</h2>
      <p>Gestiona hoteles, usuarios y reservas desde aquí.</p>
      <button onClick={logout} className="button" style={{ background: "#d32f2f" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default AdminOverview;