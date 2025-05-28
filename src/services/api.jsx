import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:3000/FYPH/v1",
    timeout: 3000,
    httpsAgent: false
})

api.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user");

        if (userDetails) {
            try {
                const parsedUser = JSON.parse(userDetails);
                if (parsedUser?.token) {
                    config.headers.Authorization = `Bearer ${parsedUser.token}`;
                    // console.log("Token agregado al header:", parsedUser.token);
                }
            } catch (err) {
                console.warn("Error al leer el token:", err);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Interceptor para manejar errores globales
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Si el error es 401 (no autorizado) y no estamos en login, limpiar localStorage y redirigir
        if (error.response && error.response.status === 401 && !window.location.pathname.includes('/auth')) {
            console.warn('Sesión expirada o inválida');
            localStorage.removeItem('user');
            // Redirigir a login si no estamos ya en login
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export const register = async (data) => {
    try {
        return await api.post("/auth/register", data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const login = async (data) => {
    try {
        return await api.post("/auth/login", data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

// USUARIOS

export const getUsers = async () => {
    try {
        return await api.get("/users");
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getUserById = async (id) => {
    try {
        return await api.get(`/users/findUser/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteUserAdmin = async (id) => {
    try {
        return await api.delete(`/users/deleteUserAdmin/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteUserClient = async () => {
    try {
        return await api.delete("/users/deleteUserClient");
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updatePassword = async (data) => {
    try {
        return await api.patch("/users/updatePassword", data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateUser = async (data) => {
    try {
        const response = await api.put("/users/updateUser", data);
        console.log("Respuesta updateUser:", response);
        
        // Si la actualización fue exitosa, actualizar el usuario en localStorage
        if (response.data && response.data.user) {
            const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
            const updatedUser = {
                ...currentUser,
                ...response.data.user
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        
        return response;
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateUserAdmin = async (id, data) => {
    try {
        return await api.put(`/users/updateUserAdmin/${id}`, data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const createUser = async (data) => {
    try {
        return await api.post("/users/createUser", data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateRole = async (id, data) => {
    try {
        return await api.patch(`/users/updateRole/${id}`, data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

// HOTELES
export const getHoteles = async () => {
    try {
        return await api.get("/hotels");
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getHotelById = async (id) => {
    try {
        return await api.get(`/hotels/findHotel/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const addHotel = async (data) => {
    try {
        return await api.post("/hotels/createHotel", data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateHotel = async (id, data) => {
    try {
        return await api.put(`/hotels/updateHotel/${id}`, data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteHotel = async (id) => {
    try {
        return await api.delete(`/hotels/deleteHotel/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

// HABITACIONES

export const getRooms = async () => {
    try {
        return await api.get("/rooms/getRooms");
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getRoomById = async (id) => {
    try {
        return await api.get(`/rooms/getRoomById/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const createRooms = async (data) => {
    try {
        return await api.post("/rooms/createRoom", data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateRoom = async (id, data) => {
    try {
        return await api.put(`/rooms/updateRoom/${id}`, data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

// RESERVACIONES

export const getReservations = async () => {
    try {
        return await api.get("/reservations");
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getReservationById = async (id) => {
    try {
        return await api.get(`/reservations/listReser/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const addReservation = async (data) => {
    try {
        return await api.post("/reservations/createReser", data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateReservation = async (id, data) => {
    try {
        return await api.put(`/reservations/updateReser/${id}`, data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteReservation = async (id) => {
    try {
        return await api.delete(`/reservations/deleteReser/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}