import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { privateAxios, publicAxios } from "../services/axios.service";
import Swal from "sweetalert2";

const useLoader = () => {

    const [loading,setLoading] = useState(false)

    useEffect(()=>{
      //request interceptor
      privateAxios.interceptors.request.use(
        (config) => {
          setLoading(true);
          return config;
        },
        (error)=>{
          return Promise.reject(error)
        }
      )
      //response interceptor
      privateAxios.interceptors.response.use(
        (config) => {
          setLoading(false);
          return config;
        },
        (error)=>{
          setLoading(false)
          if(error.code==='ERR_NETWORK'){
            Swal.fire('Network Error','Backend server is down !\nTry Again','error')
         }
          return Promise.reject(error)
        }
      )
  
      // Request interceptor for publicAxios
    publicAxios.interceptors.request.use(
      (config) => {
        // You can add any common request logic here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    // Response interceptor for publicAxios
    publicAxios.interceptors.response.use(
      (response) => {
        // You can add any common response logic here
        return response;
      },
      (error) => {
        setLoading(false)
        if(error.code==='ERR_NETWORK'){
           Swal.fire('Network Error','Backend server is down !\nTry Again','error')
        }
        return Promise.reject(error);
      }
    );
    },[])  

  return loading;
}

export default useLoader