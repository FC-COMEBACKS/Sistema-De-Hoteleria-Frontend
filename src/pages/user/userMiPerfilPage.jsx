import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../../shared/hooks/useUserDetails";
import UserMiPerfil from "../../components/usuarios/UserMiPerfil";
import "./userPage.css";

const UserMiPerfilPage = () => {
    const navigate = useNavigate();
    const { isLogged } = useUserDetails();
    
    useEffect(() => {
        // Verificar si el usuario está logueado, si no, redirigir a login
        if (!isLogged) {
            navigate("/auth");
        }
    }, [isLogged, navigate]);
    
    return (
        <div className="user-perfil-page">
            {isLogged && <UserMiPerfil />}
        </div>
    );
};

export default UserMiPerfilPage;