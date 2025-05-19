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
    try{
        return await api.post("/auth/register", data);
    }catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const login = async (data) => {
    try{
        return await api.post("/auth/login", data);
    }catch (err) {
        return{
            error: true,
            err
        }
    }
}