import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ButtonLogout = () => {

    const navigate = useNavigate();

    const logOut = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => {
                navigate("/")
                document.location.reload()
                console.log("Cookie was cleared")
        })
            .catch(err => console.log(err));
    }


    return(
        <button className='btn btn-danger float-right' onClick={logOut}>Log Out</button>
    )

}

export default ButtonLogout;