import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Styles
import styles from "./../UpdateProfile/UpdateProfile.module.css"

//Material UI Components
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

//Material UI icons
// import EditIcon from '@mui/icons-material/Edit';

import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';


const EditProfile = ({userId}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [location, setLocation] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState(undefined);
    const [chosenImage, setChosenImage] = useState(null);
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
                setCellphone(res.data.cellphone)
                setLocation(res.data.location)
                setPostalCode(res.data.postalCode)
                setProfilePictureURL(res.data.profilePictureURL)
            })
            .catch(error => console.log(error));
    }, [userId])

    const updateProfile = (e) => {
        //
        e.preventDefault();
        const bodyFormData = new FormData()
        bodyFormData.append('firstName',firstName)
        bodyFormData.append('lastName',lastName)
        bodyFormData.append('cellphone',cellphone)
        bodyFormData.append('location',location)
        bodyFormData.append('postalCode',postalCode)
        console.log(bodyFormData)
        if(chosenImage!==null){
           bodyFormData.append('profilePicture',chosenImage) 
        }
        
        axios.put("http://localhost:8000/api/users/"+userId,bodyFormData,{withCredentials: true})
            .then(res => navigate("/profile"))
            .catch(error => {
                setErrors(error.response.data.errors)
                console.log(error.response.data.errors)
            });
    }

    //
    const handleFile = (e) => {
        console.log(e)
        console.log(e.target.files[0])
        setChosenImage(e.target.files[0])
    }

    //Material UI Component
    const Input = styled("input")({
        display: "none"
    });

    return (
        <div className={styles.page}>
            <h2 className={styles.page__title}>Profile</h2>
            <div className={styles.user}>
                <form onSubmit={updateProfile} className={styles.user__form}>
                    <div className={styles.user__basic}>
                        <div className={styles.user__left}>
                            {profilePictureURL!==undefined?<img src={require("./../../../uploads/profilePicture/"+profilePictureURL)} alt={`${firstName}-${lastName}-profile-picture}`}/>:null}
                            <div className={styles.user__edit}>
                                {/* Material UI Component */}
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="icon-button-file">
                                        <Input accept="image/*" id="icon-button-file" type="file" name="profilePicture" onChange={handleFile}/>
                                        <IconButton
                                        aria-label="upload picture"
                                        component="span"
                                        >
                                        <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Stack>
                            </div>
                        </div>
                        <span></span>
                        <div className={styles.user__right}>
                            <h3>{firstName} {lastName}</h3>
                        </div> 
                    </div>

                    <div className={styles.user__extend}>
                        <div className={styles.user__label}>
                            <div className={styles.user__icon}>
                                <BadgeIcon style={{fontSize:30}}></BadgeIcon>
                            </div>
                            <div className={styles.user__info}>
                                <label className={styles.x} htmlFor="firstName">First Name:</label>
                                <input className={styles.user__input} type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setLastName(e.target.value)} />
                                {errors.firstName ? <span className="text-danger">{errors.firstName.message}</span> : null}
                            </div>
                        </div>
                        <div className={styles.user__label}>
                            <div className={styles.user__icon}>
                                <BadgeIcon style={{fontSize:30}}></BadgeIcon>
                            </div>
                            <div className={styles.user__info}>
                                <label htmlFor="lastName">Last Name:</label>
                                <input className={styles.user__input} type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                {errors.lastName ? <span className="text-danger">{errors.lastName.message}</span> : null}
                            </div>
                        </div>
                        <div className={styles.user__label}>
                            <div className={styles.user__icon}>
                                <EmailIcon style={{fontSize:30}}></EmailIcon>
                            </div>
                            <div className={styles.user__info}>
                                <label htmlFor="cellphone">Email:</label>
                                <input className={styles.user__input__disabled} type="text" value={email} readonly="readonly"/>
                                {/* <input type="text" id="cellphone" name="email" value={cellphone} onChange={(e) => setCellphone(e.target.value)} className="form-control" /> */}
                                {/* {errors.cellphone ? <span className="text-danger">{errors.cellphone.message}</span> : null} */}
                            </div>
                        </div>
                        <div className={styles.user__label}>
                            <div className={styles.user__icon}>
                                <LocalPhoneIcon style={{fontSize:30}}></LocalPhoneIcon>
                            </div>
                            <div className={styles.user__info}>
                                <label htmlFor="cellphone">Cellphone:</label>
                                <input className={styles.user__input} type="text" id="cellphone" name="cellphone" value={cellphone} onChange={(e) => setCellphone(e.target.value)}/>
                                {errors.cellphone ? <span className="text-danger">{errors.cellphone.message}</span> : null}
                            </div>
                        </div>
                        <div className={styles.user__label}>
                            <div className={styles.user__icon}>
                                <LocationOnIcon style={{fontSize:30}}></LocationOnIcon>
                            </div>
                            <div className={styles.user__info}>
                                <label htmlFor="location">Location:</label>
                                <input className={styles.user__input} type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                {errors.location ? <span className="text-danger">{errors.location.message}</span> : null}
                            </div>
                        </div>
                        <div className={styles.user__label}>
                            <div className={styles.user__icon}>
                                <MarkunreadMailboxIcon style={{fontSize:30}}></MarkunreadMailboxIcon>
                            </div>
                            <div className={styles.user__info}>
                                <label htmlFor="postalCode">Postal Code:</label>
                                <input className={styles.user__input} type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
                                {errors.postalCode ? <span className="text-danger">{errors.postalCode.message}</span> : null}
                            </div>
                        </div>
                    </div>
                    <div className={styles.user__submit}>
                        <button type="submit" className={styles.user__button}>Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default EditProfile;