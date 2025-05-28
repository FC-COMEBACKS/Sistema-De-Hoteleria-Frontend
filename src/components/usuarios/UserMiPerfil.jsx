import React, { useState } from "react";
import { useUser } from "../../shared/hooks/useUser";
import UserForm from "./UserForm";
import toast from "react-hot-toast";

const PasswordForm = ({ onSubmit, onCancel }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    return (
        <form onSubmit={e => { e.preventDefault(); onSubmit({ oldPassword, newPassword }); }}>
            <input
                type="password"
                placeholder="Contraseña actual"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
            />
            <button type="submit" className="add-button">Actualizar</button>
            <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

const UserMiPerfil = () => {
    const { updateUser, deleteUserClient, updatePassword } = useUser();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
    const userDetails = userData;
    const [showEdit, setShowEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleUpdate = async (formData) => {
        try {
            const success = await updateUser(formData);
            if (success) {
                // Actualizar datos locales del usuario al editar el perfil
                const updatedUser = {...userData, ...formData};
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUserData(updatedUser);
                toast.success("Perfil actualizado");
                setShowEdit(false);
            }
        } catch (error) {
            toast.error("Error al actualizar el perfil: " + error.message);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("¿Seguro que deseas eliminar tu cuenta?")) {
            const success = await deleteUserClient();
            if (success) toast.success("Cuenta eliminada");
        }
    };

    const handlePassword = async ({ oldPassword, newPassword }) => {
        const success = await updatePassword({ oldPassword, newPassword });
        if (success) {
            toast.success("Contraseña actualizada");
            setShowPassword(false);
        }
    };

    return (
        <div className="users-container">
            <div className="perfil-header-box">
                <h2>
                    <b className="perfil-header-title">Mi Perfil</b>
                </h2>
            </div>
            {!showEdit && !showPassword && (
                <div className="perfil-content">
                    <table className="perfil-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{userDetails.name}</td>
                                <td>{userDetails.email}</td>
                                <td>
                                    <span className="badge-activo">{userDetails.role}</span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn btn-warning" onClick={() => setShowEdit(true)}>
                                            Editar Perfil
                                        </button>
                                        <button className="btn btn-warning" onClick={() => setShowPassword(true)}>
                                            Cambiar Contraseña
                                        </button>
                                        <button className="btn btn-danger" onClick={handleDelete}>
                                            Eliminar Cuenta
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {showEdit && (
                <UserForm
                    onSubmit={handleUpdate}
                    onCancel={() => setShowEdit(false)}
                    initialData={userDetails}
                    isEdit={true}
                />
            )}
            {showPassword && (
                <PasswordForm
                    onSubmit={handlePassword}
                    onCancel={() => setShowPassword(false)}
                />
            )}
        </div>
    );
};

export default UserMiPerfil;