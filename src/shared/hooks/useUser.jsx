import { useState, useEffect } from 'react';
import {
    getUsers as getUsersRequest,
    getUserById as getUserByIdRequest,
    deleteUserAdmin as deleteUserAdminRequest,
    deleteUserClient as deleteUserClientRequest,
    updatePassword as updatePasswordRequest,
    updateUser as updateUserRequest,
    updateUserAdmin as updateUserAdminRequest,
    createUser as createUserRequest,
    updateRole as updateRoleRequest,
} from '../../services';
import toast from 'react-hot-toast';

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = userDetails?.role;

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await getUsersRequest();
            if (response.error) {
                toast.error("Error al cargar usuarios");
                setUsers([]);
            } else {
                setUsers(response.data?.users || response.users || []);
            }
        } catch (err) {
            toast.error("Error al cargar usuarios " + err.message);
            setUsers([]);
        }
        setIsLoading(false);
    };

    const getUserById = async (uid) => {
        setIsLoading(true);
        try {
            const response = await getUserByIdRequest(uid);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al obtener usuario");
                return null;
            }
            return response.data?.user || response.user || null;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al obtener usuario " + err.message);
            return null;
        }
    };

    const deleteUserAdmin = async (uid) => {
        setIsLoading(true);
        try {
            const response = await deleteUserAdminRequest(uid);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al eliminar usuario");
                return false;
            }
            toast.success("Usuario eliminado correctamente");
            await fetchUsers();
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al eliminar usuario " + err.message);
            return false;
        }
    };

    const deleteUserClient = async () => {
        setIsLoading(true);
        try {
            const response = await deleteUserClientRequest();
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al eliminar tu cuenta");
                return false;
            }
            toast.success("Cuenta eliminada correctamente");
            await fetchUsers();
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al eliminar tu cuenta " + err.message);
            return false;
        }
    };

    const updatePassword = async (data) => {
        setIsLoading(true);
        try {
            const response = await updatePasswordRequest(data);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al actualizar contraseña");
                return false;
            }
            toast.success("Contraseña actualizada correctamente");
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al actualizar contraseña " + err.message);
            return false;
        }
    };    const updateUser = async (data) => {
        setIsLoading(true);
        try {
            const response = await updateUserRequest(data);
            setIsLoading(false);
            
            if (response.error) {
                const errorMsg = response.err?.response?.data?.message || "Error al actualizar usuario";
                toast.error(errorMsg);
                return false;
            }
            
            // Si estamos actualizando el usuario actual, actualizar en localStorage
            if (data.uid === userDetails.uid || !data.uid) {
                // Mantener el token y otros datos importantes
                const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
                const updatedUser = {
                    ...currentUser,
                    ...data,
                    ...(response.data?.user || {})
                };
                
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
            
            toast.success("Usuario actualizado correctamente");
            if (userRole === "ADMIN_ROLE" || userRole === "HOST_ROLE") {
                await fetchUsers();
            }
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al actualizar usuario " + err.message);
            return false;
        }
    };

    const updateUserAdmin = async (uid, data) => {
        setIsLoading(true);
        try {
            const response = await updateUserAdminRequest(uid, data);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al actualizar usuario (admin)");
                return false;
            }
            toast.success("Usuario actualizado correctamente (admin)");
            await fetchUsers();
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al actualizar usuario (admin) " + err.message);
            return false;
        }
    };

    const createUser = async (data) => {
        setIsLoading(true);
        try {
            const response = await createUserRequest(data);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al crear usuario");
                return false;
            }
            toast.success("Usuario creado correctamente");
            await fetchUsers();
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al crear usuario " + err.message);
            return false;
        }
    };

    const updateRole = async (uid, data) => {
        setIsLoading(true);
        try {
            const response = await updateRoleRequest(uid, data);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al actualizar rol");
                return false;
            }
            toast.success("Rol actualizado correctamente");
            await fetchUsers();
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al actualizar rol " + err.message);
            return false;
        }
    };

    useEffect(() => {
        if (userRole === "ADMIN_ROLE" || userRole === "HOST_ROLE") {
            fetchUsers();
        }
    }, [userRole]);

    return {
        users,
        isLoading,
        fetchUsers,
        getUserById,
        deleteUserAdmin,
        deleteUserClient,
        updatePassword,
        updateUser,
        updateUserAdmin,
        createUser,
        updateRole,
    };
};