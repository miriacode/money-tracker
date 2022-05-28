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
                setIncomeCategoryList(res.data.filter(category=>category.type==="income"))
                setExpensesCategoryList(res.data.filter(category=>category.type==="expense"))
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
        <div>
            <h2>Categories</h2>
            <Link to="/categories/new">Add Category</Link>
            <p>Favorite Categories</p>
            <ul>
                <li>3</li>
                <li>7</li>
                <li>8</li>
            </ul>

            <h4>All Categories</h4>

            <h5>Expenses Category</h5>
            {expensesCategoryList.length===0?<p>You don't have any expenses categories yet</p>:expensesCategoryList.map((category, index) => (
                <div className="container border border-dark" key={index}>
                    <p>{category.categoryName}</p>
                    <Link to={"/categories/update/"+category._id}>Edit</Link> 
                    <button onClick={() => deleteCategory(category._id)}>Delete</button>
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