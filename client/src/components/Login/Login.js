import React, {useState} from "react";
import axios from "axios";
import {useHistory, Link} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState("");

    const history = useHistory();


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
                    history.push("/dashboard");
                }
            })
            .catch(err => console.log(err));

    }

    return (
            <div className="col-6">
                <h2>Log In</h2>
                <form onSubmit={login}>
                    <div className="form-group">
                        <label htmlFor="emailLogin">E-mail</label>
                        <input type="email" name="emailLogin" id="emailLogin" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordLogin">Password</label>
                        <input type="password" name="passwordLogin" id="passwordLogin" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        {errors !== "" ? <span className="text-danger">{errors}</span> : null}
                    </div>
                    <input type="submit" value="Log In" className="btn btn-primary" />
                </form>

                <p>You don't have an account?</p><Link to="/register">Register</Link>
            </div>
    )

}

export default Login;