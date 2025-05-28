import { useNavigate } from "react-router-dom"
import { register as registerRequest } from '../../services'
import toast from "react-hot-toast"
import { useState } from "react"
export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const register = async (name, email, password) => {

        setIsLoading(true);        
        const response = await registerRequest({
            name,
            email,
            password
        })
        
        setIsLoading(false)
        if (response.error) {
            toast.error(response.err?.response?.data?.errors?.[0]?.msg || "Error al registrar tu cuenta")
            return 
        } else {
            toast.success("¡Registro exitoso! Bienvenido a nuestro sistema.")
        }
        
        const userDetails = response.data?.userDetails
        if (userDetails) {
            // Asegurar que tenemos los datos correctos
            const userData = {
                ...userDetails,
                // Al registrarse, por defecto se asigna rol de cliente si no viene uno específico
                role: userDetails.role || "CLIENT_ROLE"
            };
            
            localStorage.setItem("user", JSON.stringify(userData))
            
            // Disparar un evento personalizado para notificar cambios en localStorage
            const event = new Event('localStorageChange');
            document.dispatchEvent(event);
            
            // Redirigir directamente a la página principal (dashboard)
            // Esto mostrará el panel de cliente porque ya estaremos logueados
            navigate("/")
        }
    }

    return {
        register,
        isLoading
    }
}