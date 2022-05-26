import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

//CSS
// import './NewCategory.css'

const NewCategory = () => {
    const [type, setType] = useState("expense");
    const [categoryName, setCategoryName] = useState("");

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const saveCategory = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/categories",{
            type: type,
            categoryName: categoryName,
        })
            .then(res => {
                console.log(res.data)
                navigate("/categories")}
            )
            .catch(error => setErrors(error.response.data.errors));
    }

    return (
        <div className="new-category">
            <h2>---New Category---</h2>
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

                <div className="form-group">
                    <label htmlFor="categoryName">Category Name:</label>
                    <input type="text" id="categoryName" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control" />
                    {errors.categoryName? <span className="text-danger">{errors.categoryName.message}</span> : null}
                </div>


                <input type="submit" value="Add Category" className="btn btn-success" />
            </form>
        </div>
    )
}

export default NewCategory;