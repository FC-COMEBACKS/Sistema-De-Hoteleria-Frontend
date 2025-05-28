import React, { useState } from "react";
import { useUser } from "../../shared/hooks/useUser";
import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import toast from "react-hot-toast";

const Notification = (message) => {
    toast.custom((t) => (
        <div className="user-toast">
            <span className="user-toast-message">{message}</span>
            <button
                className="user-toast-close"
                onClick={() => toast.dismiss(t.id)}
            >
                Cerrar
            </button>
        </div>
    ), {
        position: 'top-right',
        duration: 5000,
    });
};

const UserList = () => {
    const { users, createUser, deleteUserAdmin, updateUserAdmin, isLoading } = useUser();
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleSaveUser = async (formData) => {
        let success = false;

        if (editingUser) {
            success = await updateUserAdmin(editingUser.uid || editingUser._id, formData);
        } else {
            success = await createUser(formData);
        }

        if (success) {
            setShowForm(false);
            setEditingUser(null);
            Notification("Usuario guardado correctamente");
        }
    };

    const handleEditClick = (userEdit) => {
        setEditingUser(userEdit);
        setShowForm(true);
    };

    const handleDeleteUser = async (uid) => {
        await deleteUserAdmin(uid);
    };

    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="users-container">
            <h2 className="users-title">Lista de Usuarios</h2>

            <UserToolbar
                search={search}
                setSearch={setSearch}
                onAddClick={() => {
                    setShowForm(true);
                    setEditingUser(null);
                }}
            />

            <div className="user-content">
                {showForm && (
                    <div className="form-section">
                        <UserForm
                            onSubmit={handleSaveUser}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingUser(null);
                            }}
                            initialData={editingUser}
                            isEdit={!!editingUser}
                        />
                    </div>
                )}
                <div className="table-section">
                    <UserTable
                        users={filteredUsers}
                        onDelete={handleDeleteUser}
                        onEdit={handleEditClick}
                    />
                </div>
            </div>
            {isLoading && <div>Cargando usuarios...</div>}
        </div>
    );
};

export default UserList;