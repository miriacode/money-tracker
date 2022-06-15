import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

//Styles
import styles from './NewTransaction.module.css'

import RightMenu from '../../RightMenu/RightMenu'

const NewTransaction = ({userId}) => {
    const [type, setType] = useState("expense");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [categoryList, setCategoryList] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/api/categories/find/"+userId,{withCredentials: true})
            .then(res => {
                setCategoryList(res.data);
            })
            .catch(error => console.log(error));
    }, [userId]);

    const saveTransaction = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/transactions",{
            userId: userId,
            type: type,
            title: title,
            description: description,
            amount: amount,
            category: category,
            date:date,
        }, {withCredentials: true})
            .then(res => navigate("/transactions"))
            .catch(error => setErrors(error.response.data.errors));
    }

    return (
        <>
        <div className={styles.page}>
            <h2 className={styles.page__title}>New Transaction</h2>
            <form onSubmit={saveTransaction}>
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
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                    {errors.title? <span className="text-danger">{errors.title.message}</span> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                    {errors.description ? <span className="text-danger">{errors.description.message}</span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    $<input type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" />
                    {errors.amount ? <span className="text-danger">{errors.amount.message}</span> : null}
                </div>
                
                <div className="form-check">
                    <label>
                    Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>-----</option>
                            {type==="expense"?categoryList.filter(category=>category.type==="expense").map((category,index)=>(
                                <option key={index} value={category.categoryName}>{category.categoryName}</option>
                            )):categoryList.filter(category=>category.type==="income").map((category,index)=>(
                                <option key={index} value={category.categoryName}>{category.categoryName}</option>
                            ))
                           }
                        </select>
                    </label>
                    {errors.category ? <span className="text-danger">{errors.category.message}</span> : null}

                </div>
                <div className="form-check">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    {errors.date ? <span className="text-danger">{errors.date.message}</span> : null}
                </div>

                <input type="submit" value="Add" className="btn btn-success" />
            </form>
        </div>
        <RightMenu userId={userId}></RightMenu>
        </>

    )
}

export default NewTransaction;