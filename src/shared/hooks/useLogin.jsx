import { useNavigate } from "react-router-dom"
import { login as loginRequest } from '../../services'
import toast from "react-hot-toast"
import { useState } from "react"

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    
    const login = async (email, password) => {

        setIsLoading(true)

        const response = await loginRequest({
            email,
            password
        })

        setIsLoading(false)

        if(response.error){
            toast.error(response.err?.response?.data?.errors?.[0]?.msg || "Error iniciar sesión")
            return; // Salir si hay error
        }else{
            toast.success(response.data.message)
        }


        const { userDetails } = response.data || {};
        if (userDetails) {
            localStorage.setItem('user', JSON.stringify(userDetails));
            if (userDetails.role === "ADMIN_ROLE") {
                navigate("/admin");
            } else {
                navigate("/cliente");
            }
        }
    }

    return{
        login,
        isLoading
    }
}
