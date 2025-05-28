import React from "react";
import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";

const UserTable = ({ users, onEdit, onDelete }) => (
    <table className="users-table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Eventos</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.uid || user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>                    
                    <td>{user.role || "No asignado"}</td>
                    <td>{user.events === "Sin eventos asignados" ? "No asignado" : user.events || "No asignado"}</td>
                    <td>{user.status ? "Activo" : "Inactivo"}</td>
                    <td>
                        <div className="action-buttons">
                            <EditButton onClick={() => onEdit(user)} />
                            <DeleteButton onClick={() => onDelete(user.uid || user._id)} />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default UserTable;