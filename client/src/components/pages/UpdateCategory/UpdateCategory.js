import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

//Styles
import styles from "./UpdateCategory.module.css"

//Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateCategory = ({userId, click, categoryId}) => {
    
    // const {id} = useParams();

    const [type, setType] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() =>{
        console.log(categoryId)
        axios.get("http://localhost:8000/api/categories/"+categoryId,{withCredentials: true})
            .then(res => {
                setType(res.data.type);
                setCategoryName(res.data.categoryName);
                console.log("iiiiiiiiiiiiiiiii")
                console.log(res.data)
            })
            .catch(error => console.log(error));
    }, [categoryId])
    
    const updateCategory = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/categories/"+categoryId,{
            type,
            categoryName: categoryName,
        },{withCredentials: true})
            .then(res => {
                //Ruta, Controller to make a general Update of all Categories that have the same name of a user (userId)
                navigate("/categories")
            })
            .catch(err => {
                setErrors(err.response.data.errors)
                console.log(err.response.data.errors)            
            })
    }

    const returnToPreviousPage = () => {
        click(null)
    }

    return (
        <div className={styles.popup__background}>
            <div className={styles.popup}>
                <h2 className={styles.popup__title}>Update Category</h2>
                <form onSubmit={updateCategory}>
                    <div  className={styles.category__center}>
                        <label
                            className={styles.category__label}>
                            Type:
                        </label>
                        <select 
                            value={type} 
                            onChange={(e)=>setType(e.target.value)}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div className={styles.category__control}>
                        <label htmlFor="categoryName">Category Name:</label>
                        <input 
                            className={styles.category__input} 
                            type="text" 
                            id="categoryName" 
                            name="categoryName" 
                            value={categoryName} 
                            onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    {errors.title? <span className={styles.category__error}>{errors.categoryName.message}</span> : null}
                {/* <input type="submit" value="Update" className="btn btn-success" /> */}
                    <div className={styles.category__bottom}>
                        <button
                            className={styles.category__button}
                            onClick={returnToPreviousPage}>
                            <ArrowBackIcon style={{fontSize:"1.125rem"}}></ArrowBackIcon>
                            Return
                            </button>

                        <input 
                            className={styles.category__button} 
                            type="submit"
                            value="Create"
                        />
                    </div>
            </form>
            </div>
            
        </div>
    )
}

export default UpdateCategory;