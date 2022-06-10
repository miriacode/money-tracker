import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//Styles
import styles from "./Categories.module.css";

//Material UI Icons
import LayersIcon from '@mui/icons-material/Layers';
import AddIcon from '@mui/icons-material/Add';


const Categories = ({userId}) => {

    const [incomeCategoryList, setIncomeCategoryList] = useState([]);
    const [expensesCategoryList, setExpensesCategoryList] = useState([]);

    const[favoriteCategoryList, setFavoriteCategoryList] = useState([]);
    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/categories/find/"+userId,{withCredentials: true})
            .then(res => {
                setIncomeCategoryList(res.data.filter(category=>category.type==="income"))
                setExpensesCategoryList(res.data.filter(category=>category.type==="expense"))
            })
            .catch(error => console.log(error));
    }, [userId])

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions/find/"+userId,{withCredentials: true})
            .then(res => {
               let allTransactionsList = res.data;

               const map = new Map()

                for (let i = 0; i < allTransactionsList.length; i++) {
                    if (!map.has(allTransactionsList[i].category)) {
                        map.set(allTransactionsList[i].category, 1)
                    } else {
                        let counter = map.get(allTransactionsList[i].category)
                        counter = counter + 1;
                        map.set(allTransactionsList[i].category, counter)
                    }
                }
                let newMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]))
                let allCategoriesUsed = []
                for (const key of newMap.keys()) {
                    allCategoriesUsed.push(key)
                }
                allCategoriesUsed.splice(3,)
                setFavoriteCategoryList(allCategoriesUsed)
            })
            .catch(error => console.log(error));
    }, [userId])

    const deleteCategory = (_id) =>{
        axios.delete("http://localhost:8000/api/categories/"+_id,{withCredentials: true})
            .then(res => {
                console.log(res)
                axios.get("http://localhost:8000/api/categories/find/"+userId,{withCredentials: true})
                    .then(res => {
                        setIncomeCategoryList(res.data.filter(category=>category.type==="income"))
                        setExpensesCategoryList(res.data.filter(category=>category.type==="expense"))
                    })
                    .catch(error => console.log(error));
            })
    }
    
    return (
        <div className={styles.page}>
            <div className={styles.categories}>
                <h2 className={styles.page__title}>Categories</h2>
                <div className={styles.categories__label}>
                    <h2 className={styles.categories__title}>Favorite Categories</h2>
                    <Link to="/categories/new" className={styles.categories__add}><AddIcon fontSize="small"></AddIcon>Add Category</Link>
                </div>
                
                <div>
                    <ul>
                        {favoriteCategoryList.map(category=><li>{category}</li>)}
                    </ul> 
                </div>
                <h4>All Categories</h4>
                <div>
                    <h5>Expenses Category</h5>
                    <div className={styles.scroll__bar__right}>
                    {expensesCategoryList.length===0?<p>You don't have any expenses categories yet</p>:expensesCategoryList.map((category, index) => (
                        <div key={index}>
                            <p>{category.categoryName}</p>
                            <Link to={"/categories/update/"+category._id}>Edit</Link> 
                            <button onClick={() => deleteCategory(category._id)}>Delete</button>
                        </div>
                    ))
                    }
                    </div>
                    <h5>Income Category</h5>
                    <div className={styles.scroll__bar__right}>
                        {incomeCategoryList.length===0?<p>You don't have any expenses categories yet</p>:incomeCategoryList.map((category, index) => (
                        <div key={index}>
                            <p>{category.categoryName}</p>
                            <Link to={"/categories/update/"+category._id}>Edit</Link> 
                            <button onClick={() => deleteCategory(category._id)}>Delete</button>
                        </div>
                        ))
                        }
                    </div>
                </div>           
            </div>
        </div>
    )
}

export default Categories;