import React, {useState} from "react";
import axios from "axios";
//import classNames from "classnames"
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

    // const conditionalStyles = classNames({
    //     "styles.newCategory__input__error":errors.categoryName,
    //     "styles.newCategory__input":true,
    // })

    return (
        <div className={styles.popup__background}>
            <div className={styles.popup}>
                <h2 className={styles.popup__title}>New Category</h2>

                <form onSubmit={saveCategory} className={styles.newCategory}>
                    <div>
                        <div className="form-check">
                            <label>
                            Type:
                                <select value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="categoryName">Category Name:</label>
                            <input className={styles.newCategory__input} type="text" id="categoryName" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                            {errors.categoryName? <span className={styles.newCategory__error}>{errors.categoryName.message}</span> : null}
                        </div>
                    </div>
                    <div>
                        <button className={styles.newCategory__button} onClick={returnButton}><ArrowBackIcon style={{fontSize:"1.125rem"}}></ArrowBackIcon>Return</button>
                        <input className={styles.newCategory__button} type="submit" value="Create" />
                    </div>
                </form>

            </div>
        </div>
        
    )
}

export default NewCategory;