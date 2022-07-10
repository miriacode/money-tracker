import React, {useState, useEffect} from "react";
import axios from "axios";

//Styles
import styles from "./NewCategory.module.css"

//Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//ContextAPI
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

//Importing dependency
const randomColor = require('randomcolor');



const NewCategory = ({click}) => {
    const [type, setType] = useState("expense");
    const [categoryName, setCategoryName] = useState("");
    const [color, setColor] = useState("")

    const [errors, setErrors] = useState({});

    const { userId } = useContext(AuthContext);

    useEffect(() => {
        let randomColorr = randomColor({
            luminosity: 'bright',
            format: 'hsl'
         });
        setColor(randomColorr)
    }, []);

    const saveCategory = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/categories",{
            userId: userId,
            type: type,
            categoryName: categoryName,
            color:color,
        }, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                window.location.reload();
                click(null)
            })
            .catch(error => setErrors(error.response.data.errors));
    }

    const returnToPreviousPage = () => {
        click(null)
    }

    return (
        <div className={styles.popup__background}>
            <div className={styles.popup}>
                <h2 className={styles.popup__title}>New Category</h2>

                <form onSubmit={saveCategory} className={styles.category}>
                    <div className={styles.category__center}>
                        <div className={styles.category__control}>
                            <label
                                className={styles.category__label}>
                                Type: 
                            </label>
                            <select
                                className={styles.category__select} 
                                value={type} 
                                onChange={(e) => setType(e.target.value)}>
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
                                onChange={(e) => setCategoryName(e.target.value)} 
                            />
                        </div>
                            {errors.categoryName? <span className={styles.category__error}>{errors.categoryName.message}</span> : null}
                        
                    </div>

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

export default NewCategory;