import React, {useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

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
        <div>
            <div>
                <h2>Hello, Friend</h2>
                <p>Enter your personal details and start journey with us</p>
                <button>Sign Up</button>
            </div>
            <div >
                <h2>Sign In</h2> 
                <form onSubmit={login}>
                    <div >
                        <label htmlFor="emailLogin">E-mail</label>
                        <input type="email" name="emailLogin" id="emailLogin" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor="passwordLogin">Password</label>
                        <input type="password" name="passwordLogin" id="passwordLogin" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        {errors !== "" ? <span>{errors}</span> : null}
                    </div>
                    <input type="submit" value="Log In"/>
                </form>
                <p>You don't have an account?</p><Link to="/register">Register</Link>
            </div>
        </div>
    )

}

export default Login;