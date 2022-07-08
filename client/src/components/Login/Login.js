import React, {useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

import styles from "./../Login/Login.module.css"

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        }, {withCredentials:true})

            .then( res => {
                console.log(res);
                if(res.data.error){
                    setErrors(res.data.message);
                } else {
                    navigate("/dashboard");
                    document.location.reload()
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={`${styles.box} ${styles.announce}`}>
                    <h2 className={styles.title}>Hello, Friend!</h2>
                    <p className={styles.paragraph}>Enter your personal details and start journey with us</p>
                    <Link to="/register"className={`${styles.button}`}>SIGN UP</Link>
                </div>
                <div className={`${styles.box} ${styles.enter}`}>
                    <h2 className={styles.title}>Sign In</h2> 
                    <form onSubmit={login} className={styles.form}>
                        <div className={styles.control}>
                            <EmailIcon  className={styles.icon}/>
                            <input
                                className={styles.input}
                                type="email" 
                                name="emailLogin" 
                                id="emailLogin"
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {/* {errors.email !== "" ? <span>{errors.email}</span> : null} */}
                        <div  className={styles.control}>
                            <LockIcon  className={styles.icon}/>
                            <input
                                className={styles.input}
                                type="password" 
                                name="passwordLogin" 
                                id="passwordLogin"
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {/* {errors.password !== "" ? <span>{errors.password}</span> : null} */}
                        {errors !== "" ? <span className={styles.errors}>{errors}</span> : null}
                        <input 
                            type="submit" 
                            value="SIGN IN"
                            className={`${styles.button} ${styles.submit}`}/>
                    </form>
                </div>
        </div>
        </div>
    )

}

export default Login;