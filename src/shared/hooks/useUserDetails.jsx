import { useState, useEffect} from "react";
import {logout as logoutHandler} from "./useLogout";

const getUserDetails = () => {
    const userDetails = localStorage.getItem('user')

    if (userDetails) {
        return JSON.parse(userDetails)
    }

    return null
}

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails())

    // Actualizar el estado cuando cambie el localStorage
    useEffect(() => {
        setUserDetails(getUserDetails())
        
        // Función para monitorear los cambios en localStorage
        const handleStorageChange = () => {
            setUserDetails(getUserDetails())
        }
        
        // Escuchar el evento 'storage' para cambios en otras pestañas
        window.addEventListener('storage', handleStorageChange)
        
        // Crear un evento personalizado para cambios en esta pestaña
        const originalSetItem = localStorage.setItem
        localStorage.setItem = function() {
            const event = new Event('localStorageChange')
            document.dispatchEvent(event)
            originalSetItem.apply(this, arguments)
        }
        
        // Escuchar el evento personalizado
        const handleCustomStorageChange = () => {
            setUserDetails(getUserDetails())
        }
        document.addEventListener('localStorageChange', handleCustomStorageChange)
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            document.removeEventListener('localStorageChange', handleCustomStorageChange)
            // Restaurar la función original si el componente se desmonta
            localStorage.setItem = originalSetItem
        }
    },[])

    const logout = () => {
        logoutHandler()
        setUserDetails(null)
    }

    const isRole = (userDetails) => {

        if(userDetails?.role === "ADMIN_ROLE"){
            return true
        }else {
            return false
        }
    }    
    return{
        isLogged: Boolean(userDetails),
        userRole: isRole(userDetails), 
        userDetails,
        logout
    }
}