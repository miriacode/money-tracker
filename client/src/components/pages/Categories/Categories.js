import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Categories = () => {
    const [categoryList, setCategoryList] = useState([]);
    
    // const [type, setType] = useState("expense");

    useEffect(() =>{
        axios.get("http://localhost:8000/api/categories")
            .then(res => {
                setCategoryList(res.data)
                // console.log(categoryList)
            })
            .catch(error => console.log(error));
    }, [])
    
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
            {categoryList.filter(category=>category.type==="expense").map((category, index) => (
                <div className="container border border-dark" key={index}>
                    {/* <p>{category.type}</p> */}
                    <p>{category.categoryName}</p>
                </div>
            ))
            }

            <h5>Income Category</h5>
            {categoryList.filter(category=>category.type==="income").map((category, index) => (
                <div className="container border border-dark" key={index}>
                    <p>{category.categoryName}</p>
                </div>
            ))
            }
            
       
        </div>
    )
}

export default Categories;