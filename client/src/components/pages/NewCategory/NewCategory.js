import React, {useState} from "react";
import axios from "axios";
// import {useNavigate} from "react-router-dom";

// import { style } from "@mui/system";

//Styles
import styles from "./NewCategory.module.css"
// import { Hidden } from "@mui/material";

//Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewCategory = ({userId, click}) => {
    const [type, setType] = useState("expense");
    const [categoryName, setCategoryName] = useState("");

    const [errors, setErrors] = useState({});
    // const navigate = useNavigate();

    const saveCategory = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/categories",{
            userId: userId,
            type: type,
            categoryName: categoryName,
        }, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                window.location.reload();
                click(null)
                // navigate("/categories")
            }
            )
            .catch(error => setErrors(error.response.data.errors));
    }

    const returnButton = () => {
        click(null)
    }

    return (
        <div className={styles.newCategory__background}>
            <div className={styles.newCategory}>
                <h2>New Category</h2>
                <form onSubmit={saveCategory}>
                    <div className="form-check">
                        <label>
                        Type:
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </label>
                        {/* {errors.type? <span className="text-danger">{errors.type.message}</span> : null} */}
                    </div>

                    <div>
                        <label htmlFor="categoryName">Category Name:</label>
                        <input type="text" id="categoryName" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        {errors.categoryName? <span>{errors.categoryName.message}</span> : null}
                    </div>

                    <button onClick={returnButton}><ArrowBackIcon></ArrowBackIcon>Return</button>
                    <input type="submit" value="Add Category" className="btn btn-success" />
                </form>
            </div>
        </div>
        
    )
}

export default NewCategory;