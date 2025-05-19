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

    useEffect(() => {
        setUserDetails(getUserDetails())
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
        logout
    }
}