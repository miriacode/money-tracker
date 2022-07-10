import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

//Styles
import styles from './SideMenu.module.scss'

//Material Icons
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

//ContextAPI
import { useContext } from "react";
import ThemeContext from './../../context/ThemeContext';
import AuthContext from "../../context/AuthContext";

const SideMenu = () => {

    const { theme, handleTheme } = useContext(ThemeContext);

    const [user, setUser] = useState({});
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                setUser(res.data)
                console.log(res.data)
            })
            .catch(error => console.log(error));
    }, [userId,user]);

    return (
        <div className={styles.sidemenu}>
            <div className={styles.sidemenu__theme}>
                <button onClick={handleTheme} className={styles.sidemenu__button}>
                {theme === 'light'? 
                    <DarkModeIcon className={styles.sidemenu__icon}></DarkModeIcon> :
                    <LightModeIcon className={styles.sidemenu__icon}></LightModeIcon>}
                </button>
            </div>
            <div className={styles.sidemenu__user}>
                {user.profilePictureURL!==undefined?<img className={styles.sidemenu__userimage} src={require("./../../uploads/profilePicture/"+user.profilePictureURL)} alt={`${user.firstName}-${user.lastName}-profile-picture}`}/>:null}
                <Link className={styles.sidemenu__username} to="/profile">{user.firstName} {user.lastName}</Link>
            </div>
            
        </div>
    )
}

export default SideMenu;