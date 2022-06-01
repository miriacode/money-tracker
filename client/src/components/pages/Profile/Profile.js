import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Profile = ({userId}) => {

    const [user, setUser] = useState({});
    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                setUser(res.data)
            })
            .catch(error => console.log(error));
    }, [userId])

    return (
        <div>
            <h2>Profile</h2>
            {/* <img></img> */}
            <h3>{user.firstName} {user.lastName}</h3>
            <p>First Name:</p>
            <p>{user.firstName}</p>
            <p>Last Name:</p>
            <p>{user.lastName}</p>
            <p>Email:</p>
            <p>{user.email}</p>
            <p>Cellphone:</p>
            <p>{user.cellphone}</p>
            <p>Location:</p>
            <p>{user.location}</p>
            <p>Postal Code:</p>
            <p>{user.postalCode}</p>
            <Link to="/profile/edit">Edit</Link>
        </div>
    )
}

export default Profile;