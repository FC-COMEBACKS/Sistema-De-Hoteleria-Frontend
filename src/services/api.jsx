import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:3000/FYPH/v1",
    timeout: 3000,
    httpsAgent: false
});

api.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user");

        if (userDetails) {
            try {
                const parsedUser = JSON.parse(userDetails);
                if (parsedUser?.token) {
                    config.headers.Authorization = `Bearer ${parsedUser.token}`;
                    console.log("Token agregado al header:", parsedUser.token); 
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