import React, {useState, useEffect} from "react";
import axios from "axios";

//CSS
import './SideMenu.css'

const SideMenu = ({userId, switchTheme, theme}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                console.log(res.data)
                setUser(res.data)
               
            })
            .catch(error => console.log(error));
    }, [userId,user]);

    return (
        <div className="side-menu">
            <div>Luna/Sol</div>
            <button onClick={switchTheme}>
                Switch to {theme === 'light'? 'Dark' : 'Light'}
            </button>
            <h2>{user.firstName} {user.lastName}</h2>
            {user.profilePictureURL!==undefined?<img src={require("./../../uploads/profilePicture/"+user.profilePictureURL)} alt={`${user.firstName}-${user.lastName}-profile-picture}`}/>:null}
            <div>Pic</div>
        </div>
    )
}

export default SideMenu;