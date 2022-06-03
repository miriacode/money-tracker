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
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const [chosenImage, setChosenImage] = useState(null);
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //
    
    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                //setEmail(res.data.email)
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
        // axios.put("http://localhost:8000/api/users/"+userId,{
        //     firstName: firstName,
        //     lastName: lastName,
        //     cellphone: cellphone,
        //     location: location,
        //     postalCode: postalCode,
        // },{withCredentials: true})
        //     .then(res => navigate("/profile"))
        //     .catch(err => setErrors(err.response.data.errors))
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
            .catch(error => console.log(error.response.data.errors));
    }

    //
    const handleFile = (e) => {
        console.log(e)
        console.log(e.target.files[0])
        setChosenImage(e.target.files[0])
    }

    return (
        <div>
            <h2>Profile</h2>
            {profilePictureURL}
            <form onSubmit={updateProfile}>
                    <input type="file" name="profilePicture" onChange={handleFile}/>

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
                
                <button type="submit">Submit</button>
                {/* <input type="submit" value="Update" className="btn btn-success" /> */}
            </form>
        </div>
    )
}

export default Profile;