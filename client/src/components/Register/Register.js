import React, {useState} from "react";
import axios from "axios";
import {useHistory, Link} from "react-router-dom";

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const register = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            confirmPassword: confirmPassword,
            categories:[],
            transactions:[],
        }, {withCredentials: true})
            .then( res => {
                console.log(res);
                history.push("/");
            })
            .catch( err => {setErrors(err.response.data.errors)
            console.log(err)});

    }

    return (
        <div className="row">
            <div className="col-6">
                <h2>Register</h2>
                <form onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        { errors.firstName ? <span className="text-danger">{errors.firstName.message}</span> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        { errors.lastName ? <span className="text-danger">{errors.lastName.message}</span> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        { errors.email ? <span className="text-danger">{errors.email.message}</span> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        { errors.password ? <span className="text-danger">{errors.password.message}</span> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        { errors.confirmPassword ? <span className="text-danger">{errors.confirmPassword.message}</span> : null }
                    </div>
                    <input type="submit" value="Register" className="btn btn-primary" />
                </form>
            </div>
            <p>If you have an account</p><Link to="/login">Login</Link>
        </div>
    )

}

export default Register;