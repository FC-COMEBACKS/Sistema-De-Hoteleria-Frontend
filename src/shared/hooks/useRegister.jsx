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
            toast.success(response.data.message)
        }

        const userDetails = response.data?.userDetails
        if (userDetails) {
            localStorage.setItem("user", JSON.stringify(userDetails))
            navigate("/")
        }
    }

    return {
        register,
        isLoading
    }
}