import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

const UpdateCategory = ({userId}) => {
    
    const {id} = useParams();

    const [type, setType] = useState("");
    const [categoryName, setCategoryName] = useState("");

    //const [categoryList, setCategoryList] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/categories/"+id,{withCredentials: true})
            .then(res => {
                setType(res.data.type);
                setCategoryName(res.data.categoryName);
            })
            .catch(error => console.log(error));
    }, [id])
    
    const updateCategory = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/categories/"+id,{
            type,
            categoryName: categoryName,
        },{withCredentials: true})
            .then(res => {
                //Ruta, Controller to make a general Update of all Categories that have the same name of a user (userId)
                navigate("/categories")
            })
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div>
            <h2>Update Category</h2>
            <div>
            <form onSubmit={updateCategory}>
                <div className="form-check">
                    <label>
                    Type:
                        <select value={type} onChange={(e)=>setType(e.target.value)}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="categoryName">Category Name:</label>
                    <input type="text" id="categoryName" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control" />
                    {errors.title? <span className="text-danger">{errors.categoryName.message}</span> : null}
                </div>
                <input type="submit" value="Update" className="btn btn-success" />
            </form>
            </div>
            
        </div>
    )
}

export default UpdateCategory;