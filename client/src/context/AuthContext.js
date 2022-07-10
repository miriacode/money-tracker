import { createContext, useState, useEffect } from "react";
//To get cookies and decodify jwt
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

//Context
const AuthContext = createContext();

//Provider
const AuthProvider = ({ children }) => {
  
    // const [auth, setAuth] = useState(null);
    const[cookies] = useCookies(['usertoken'])
    const[userId, setUserId] = useState(null)
  
    // const handleAuth = () => {
    //     if(auth){
    //         setAuth(null)
    //     }else{
    //         setAuth(true)
    //     }
    // };

    useEffect(() => {
        if(cookies.usertoken!==undefined){
          setUserId(jwt_decode(cookies.usertoken)._id)
        }
    }, [cookies.usertoken]);
  
    const data = { userId };
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
  
  export { AuthProvider };

  export default AuthContext;