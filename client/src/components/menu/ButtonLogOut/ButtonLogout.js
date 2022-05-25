import axios from 'axios';
import { useHistory } from "react-router-dom";

const ButtonLogout = () => {

    const history = useHistory();

    const logOut = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => {
                history.push("/")
                console.log("Cookie was cleared")
        })
            .catch(err => console.log(err));
    }


    return(
        <button className='btn btn-danger float-right' onClick={logOut}>Log Out</button>
    )

}

export default ButtonLogout;