import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Profile = ({userId}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    //const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [location, setLocation] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                //setEmail(res.data.email)
                setCellphone(res.data.cellphone)
                setLocation(res.data.location)
                setPostalCode(res.data.postalCode)
            })
            .catch(error => console.log(error));
    }, [userId])

    const updateProfile = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/users/"+userId,{
            firstName: firstName,
            lastName: lastName,
            cellphone: cellphone,
            location: location,
            postalCode: postalCode,
        },{withCredentials: true})
            .then(res => navigate("/profile"))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div>
            <h2>Profile</h2>
            {/* <img></img> */}
            <form onSubmit={updateProfile}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                    {errors.firstName? <span className="text-danger">{errors.firstName.message}</span> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                    {errors.lastName ? <span className="text-danger">{errors.lastName.message}</span> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="cellphone">Cellphone:</label>
                    <input type="text" id="cellphone" name="cellphone" value={cellphone} onChange={(e) => setCellphone(e.target.value)} className="form-control" />
                    {errors.cellphone ? <span className="text-danger">{errors.cellphone.message}</span> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="cellphone">Location:</label>
                    <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" />
                    {errors.location ? <span className="text-danger">{errors.location.message}</span> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="form-control" />
                    {errors.postalCode ? <span className="text-danger">{errors.postalCode.message}</span> : null}
                </div>
                

                <input type="submit" value="Update" className="btn btn-success" />
            </form>
            {/* <h3>{user.firstName} {user.lastName}</h3>
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
            <Link to="/profile/edit">Edit</Link> */}
        </div>
    )
}

export default Profile;