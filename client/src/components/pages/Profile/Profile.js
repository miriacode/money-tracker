import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//Styles
import styles from "./../Profile/Profile.module.css"

//Material UI icons
import EditIcon from '@mui/icons-material/Edit';

import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';


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
        <div className={styles.page}>
            <h2 className={styles.page__title}>Profile</h2>
                <div className={styles.user}>
                    <div className={styles.user__basic}>
                        {user.profilePictureURL!==undefined?<img src={require("./../../../uploads/profilePicture/"+user.profilePictureURL)} alt={`${user.firstName}-${user.lastName}-profile-picture}`}/>:null}
                        <div className={styles.user__edit}>
                            <Link to="/profile/edit">
                                <EditIcon></EditIcon> 
                            </Link>
                        </div>
                        <span></span>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p>{user.location}</p>
                    </div>
                    <div className={styles.user__extend}>
                        <div className={styles.user__label}>
                            <BadgeIcon></BadgeIcon>
                            <p>First Name:</p>
                            <p>{user.firstName}</p>
                        </div>
                        <div className={styles.user__label}>
                            <BadgeIcon></BadgeIcon>
                            <p>Last Name:</p>
                            <p>{user.lastName}</p>
                        </div>
                        <div className={styles.user__label}>
                            <EmailIcon></EmailIcon>
                            <p>Email:</p>
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.user__label}>
                            <LocalPhoneIcon></LocalPhoneIcon>
                            <p>Cellphone:</p>
                            <p>{user.cellphone}</p>
                        </div>
                        <div className={styles.user__label}>
                            <LocationOnIcon></LocationOnIcon>
                            <p>Location:</p>
                            <p>{user.location}</p>
                        </div>
                        <div className={styles.user__label}>
                            <MarkunreadMailboxIcon></MarkunreadMailboxIcon>
                            <p>Postal Code:</p>
                            <p>{user.postalCode}</p>
                        </div>         
                    </div>
                </div>
        </div>
    )
}

export default Profile;