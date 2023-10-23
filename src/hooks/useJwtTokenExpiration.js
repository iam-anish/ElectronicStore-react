import React from 'react'
import { getTokenFromLocalStorage } from '../auth/HelperAuth'
import { isJwtExpired } from 'jwt-check-expiration';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const useJwtTokenExpiration = () => {

    const [flag,setFlag] = useState(false);
    const navigate = useNavigate()
    const {logout} =  useContext(UserContext);

    useEffect(()=>{
       try {
        const token = getTokenFromLocalStorage();
        if(isJwtExpired(token)){
            console.log("Token is expired")
            setFlag(true)
            toast.error("Session Expired !! ReLogin")
            logout()
            navigate("/login")
        }
       } catch (error) {
         console.log(error);
       }
    },[])

  return flag;
}

export default useJwtTokenExpiration