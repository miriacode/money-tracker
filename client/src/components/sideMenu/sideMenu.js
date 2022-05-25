import React, {useState, useEffect} from "react";
//import axios from "axios";
// import {Link} from "react-router-dom";
//import {useParams} from "react-router-dom";
// import React from "react";

//CSS
import './SideMenu.css'

//import { useCookies } from "react-cookie";
// import {check_cookie_name, parseJwt} from '../../deco/decodifier';


const SideMenu = () => {
    //const[cookiess, setCookiess] = useCookies("usertoken");
    // const [userID, setUserID] = useState("");
    // const [user, setUser] = useState({});

    // useEffect(() =>{

    //     let cookie = check_cookie_name('usertoken')

    //     let decodifiedJWT = parseJwt(cookie)
    //     console.log(decodifiedJWT._id);
    //     setUserID(decodifiedJWT._id);

    // }, [])

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/users/"+userID,{withCredentials: true})
    //         .then(res => {
    //             console.log(res.data)
    //             setUser(res.data)
               
    //         })
    //         .catch(error => console.log(error));
    // }, [userID]);

    return (
        <div className="side-menu">
            <div>Luna/Sol</div>
          
            <h2>M</h2>
            <div>Pic</div>
        </div>
    )
}

export default SideMenu;