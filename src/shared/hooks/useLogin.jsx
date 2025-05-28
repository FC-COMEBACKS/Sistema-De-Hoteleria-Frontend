import { useNavigate } from "react-router-dom"
import { login as loginRequest } from '../../services'
import toast from "react-hot-toast"
import { useState } from "react"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const login = async (email, password) => {
        setIsLoading(true);
        
        const response = await loginRequest({
            email,
            password
        });
        
        setIsLoading(false);

        if(response.error){
            toast.error(response.err?.response?.data?.errors?.[0]?.msg || "Error al iniciar sesión");
            return; 
        } else {
            toast.success("¡Inicio de sesión exitoso! Bienvenido de nuevo.");
        }
        
        const { userDetails } = response.data || {};
        if (userDetails) {
            // Guardar los detalles del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(userDetails));
            
            // Disparar un evento personalizado para notificar cambios en localStorage
            const event = new Event('localStorageChange');
            document.dispatchEvent(event);
            
            // Redirección según el rol del usuario
            if (userDetails.role === "ADMIN_ROLE" || userDetails.role === "HOST_ROLE") {
                navigate("/");  // Va al dashboard como administrador/host
            } else {
                navigate("/");  // Va al dashboard como cliente
            }
        }
    }

    return{
        login,
        isLoading
    }
}
