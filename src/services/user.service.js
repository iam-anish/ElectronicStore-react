//User related APIs call
import axios from "axios";
import { privateAxios, publicAxios } from "./axios.service"

//register new user
export const registerUser = (userData) => {
    return publicAxios.post(`/users`,userData).then((response) => response.data);
}

//login user
export const loginUser = (loginData) => {
    return publicAxios.post(`/auth/login`,loginData).then((response) => response.data)
}

//get user data
export const getUser = (userId,jwtToken) => {
    const headers = {
        'Authorization': `Bearer ${jwtToken}`, // Example: Bearer token for authentication
      };

    return publicAxios.get(`/users/${userId}`,{ headers }).then((response)=>response.data)
}

//update user data
export const updateUser = (user) => {
    return privateAxios.put(`/users/${user.userId}`,user).then((response)=>response.data)
}

//get All user
export const getAllUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    return privateAxios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then((response)=>response.data)
}

