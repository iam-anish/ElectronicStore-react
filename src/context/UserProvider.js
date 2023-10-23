import { useEffect, useState } from "react"
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, getUserFromLocalStorage, isLoggedIn } from "../auth/HelperAuth"
import UserContext from "./UserContext"
import { isAdminUser as adminUser } from "../auth/HelperAuth"


const UserProvider = ({children}) => {
    const [isLogin,setIsLogin] = useState(false)
    const [userData,setUserData] = useState(null)
    const [isAdminUser,setIsAdminUser] = useState(false)
    
    useEffect(()=>{
        setIsLogin(isLoggedIn());
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    },[]);

    //login
    const doLogin = (data) =>{
       doLoginLocalStorage(data);
       setIsLogin(true);
       setIsAdminUser(adminUser())
       setUserData(getDataFromLocalStorage());
    }

    const doLogout = () => {
        window.location.href = '/login'
        doLogoutFromLocalStorage();
        setIsLogin(false);
        setUserData(null);
        setIsAdminUser(false);
    }

    return(
        <UserContext.Provider value={{
            userData:userData,
            setUserData:setUserData,
            isLogin:isLogin,
            isAdminUser:isAdminUser,
            setIsLogin:setIsLogin,
            login:doLogin,
            logout:doLogout}}>
             {children}
        </UserContext.Provider>
    )
}

export default UserProvider;