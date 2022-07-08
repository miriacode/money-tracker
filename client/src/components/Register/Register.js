import React, {useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";


import styles from "./../Register/Register.module.css"

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

import LockIcon from '@mui/icons-material/Lock';


const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const register = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            confirmPassword: confirmPassword,
            profilePictureURL:"uploads/profilePictureDefault.jpg",
            // categories:[],
            // transactions:[],

        }, {withCredentials: true})
            .then( res => {
                console.log(res);
                navigate("/dashboard");
                document.location.reload()
            })
            .catch( err => {setErrors(err.response.data.errors)
            console.log(err)});

    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={`${styles.box} ${styles.enter}`}>
                    <h2 className={styles.title}>Register</h2>
                    <form onSubmit={register} className={styles.form}>
                    <div className={styles.control}>
                        <PersonIcon className={styles.icon}></PersonIcon>
                        {/* <label htmlFor="firstName">First Name</label> */}
                        <input
                            className={styles.input} 
                            type="text" 
                            name="firstName" 
                            id="firstName"  
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder="FirstName"/>
                        
                    </div>
                    {errors.firstName ? <span className={styles.errors}>{errors.firstName.message}</span> : null }
                    <div className={styles.control}>
                        {/* <label htmlFor="lastName">Last Name</label> */}
                        <PersonIcon className={styles.icon}></PersonIcon>
                        <input
                            className={styles.input} 
                            type="text" 
                            name="lastName" 
                            id="lastName"  
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            placeholder="LastName"/>
                        
                    </div>
                    { errors.lastName ? <span className={styles.errors}>{errors.lastName.message}</span> : null }
                    <div className={styles.control}>
                        {/* <label htmlFor="email">E-mail</label> */}
                        <EmailIcon className={styles.icon}></EmailIcon>
                        <input
                            className={styles.input} 
                            type="email" 
                            name="email" 
                            id="email"  
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email"/>
                        
                    </div>
                    { errors.email ? <span className={styles.errors}>{errors.email.message}</span> : null }
                    <div className={styles.control}>
                        {/* <label htmlFor="password">Password</label> */}
                        <LockIcon className={styles.icon}></LockIcon>
                        <input
                            className={styles.input} 
                            type="password" 
                            name="password" 
                            id="password"  
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password"/>
                        
                    </div>
                    { errors.password ? <span className={styles.errors}>{errors.password.message}</span> : null }
                    <div className={styles.control}>
                        {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                        <LockIcon className={styles.icon}></LockIcon>
                        <input
                            className={styles.input} 
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword"  
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Confirm Password"/>
                        
                    </div>
                    { errors.confirmPassword ? <span className={styles.errors}>{errors.confirmPassword.message}</span> : null }
                    <input type="submit" value="Register"  className={`${styles.button} ${styles.submit}`} />
                </form>
                </div>
                <div className={`${styles.box} ${styles.announce}`}>
                    <h2 className={styles.title}>Welcome Back!</h2>
                    <p className={styles.paragraph}>To keep connected with us, please login with your personal info</p>
                    <Link to="/" className={`${styles.button}`}>SIGN IN</Link>
                </div>
            </div>
            {/* <p>If you have an account</p><Link to="/">Login</Link> */}
        </div>
    )

}

export default Register;