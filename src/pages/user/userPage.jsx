import React from "react";
import { UserList } from "../../components";
import { useUserDetails } from "../../shared/hooks/useUserDetails";
import { Navigate } from "react-router-dom";
import "./userPage.css";

const UserPage = () => {
    const { userDetails } = useUserDetails();
    if (userDetails?.role === "CLIENT_ROLE") {
        return <Navigate to="/mi-perfil" replace />;
    }
    return (
        <div>
            <UserList />
        </div>
    );
};

export default UserPage;