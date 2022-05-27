import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Categories = ({userId}) => {

    // const [allCategoriesList, setAllCategoriesList] = useState([]);
    const [incomeCategoryList, setIncomeCategoryList] = useState([]);
    const [expensesCategoryList, setExpensesCategoryList] = useState([]);
    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/categories/find/"+userId,{withCredentials: true})
            .then(res => {
                // setAllCategoriesList(res.data)
                
                setIncomeCategoryList(res.data.filter(category=>category.type==="income"))
                setExpensesCategoryList(res.data.filter(category=>category.type==="expense"))
                // console.log(incomeCategoryList)
                // console.log(expensesCategoryList)
                // console.log(allCategoriesList.filter(category=>category.type==="income"))
            })
            .catch(error => console.log(error));
    }, [userId])
    
    return (
        <div>
            <h2>Categories</h2>
            <Link to="/categories/new">Add Category</Link>
            <p>Favorite Income Categories</p>
            <ul>
                <li>3</li>
                <li>7</li>
            </ul>
            <p>Favorite Expense Categories</p>
            <ul>
                <li>3</li>
                <li>7</li>
            </ul>

            <h4>All Categories</h4>

            <h5>Expenses Category</h5>
            {expensesCategoryList.length===0?<p>You don't have any expenses categories yet</p>:expensesCategoryList.map((category, index) => (
                <div className="container border border-dark" key={index}>
                    <p>{category.categoryName}</p>
                </div>
            ))
            }

            <h5>Income Category</h5>
            {incomeCategoryList.length===0?<p>You don't have any expenses categories yet</p>:incomeCategoryList.map((category, index) => (
                <div className="container border border-dark" key={index}>
                    <p>{category.categoryName}</p>
                </div>
            ))
            }       
        </div>
    )
}

export default Categories;