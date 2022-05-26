import React, {useState, useEffect} from "react";
import axios from "axios";

//CSS
import './SideMenu.css'

const SideMenu = ({userId}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                console.log(res.data)
                setUser(res.data)
               
            })
            .catch(error => console.log(error));
    }, [userId]);

    return (
        <div className="side-menu">
            <div>Luna/Sol</div>
          
            <h2>{user.firstName} {user.lastName}</h2>
            <div>Pic</div>
        </div>
    )
}

export default SideMenu;