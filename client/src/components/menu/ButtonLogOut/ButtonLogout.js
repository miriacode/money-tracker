import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//Styles
import styles from "./ButtonLogout.module.css"

//
import LogoutIcon from '@mui/icons-material/Logout';

const ButtonLogout = () => {

    const navigate = useNavigate();

    const logOut = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => {
                navigate("/")
                document.location.reload()
                console.log("Cookie was cleared")
        })
            .catch(err => console.log(err));
    }


    return(
        <div className={styles.button}>
            <LogoutIcon className={styles.button__icon}></LogoutIcon>
            <button className={styles.button__link}onClick={logOut}>Log Out</button>
        </div>
    )

}

export default ButtonLogout;