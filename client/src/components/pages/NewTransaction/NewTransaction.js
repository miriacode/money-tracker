import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

//Styles
import styles from './NewTransaction.module.css'

import RightMenu from '../../RightMenu/RightMenu'

const NewTransaction = ({userId, theme}) => {
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
            <form onSubmit={saveTransaction} className={styles.transaction}>
                <div className={styles.transaction__control}>
                    <label className={styles.transaction__label}>Type:</label>
                    <select 
                        className={`${styles.transaction__input} ${styles.transaction__input__select}`}
                        value={type} 
                        onChange={(e)=>setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                     </select>
                </div>

                <div className={styles.transaction__control}>
                    <label 
                        htmlFor="title" 
                        className={styles.transaction__label}>
                        Title:
                    </label>
                    <input 
                        className={errors.title?
                                    `${styles.transaction__input} ${styles.transaction__input__text} ${styles.transaction__input__error}`:
                                    `${styles.transaction__input} ${styles.transaction__input__text}`}
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={(e) => {
                                setTitle(e.target.value)
                                const {title, ...rest} = errors;
                                setErrors(rest)}}/>   
                </div>
                    {errors.title? <span className={styles.error}>{errors.title.message}</span> : null}
                <div className={styles.transaction__control__big}>
                    <label htmlFor="description" className={`${styles.transaction__label}`}>Description:</label>
                    <textarea
                        // rows={15}
                        // cols={5}
                        className={`${styles.transaction__input} ${styles.transaction__input__textarea}`}
                        id="description" 
                        name="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                    {errors.description ? <span className={styles.error}>{errors.description.message}</span> : null}
                <div className={styles.transaction__control}>
                    <label htmlFor="amount" className={styles.transaction__label}>Amount</label>$
                    <input 
                        className={errors.amount?
                            `${styles.transaction__input} ${styles.transaction__input__number} ${styles.transaction__input__error}`:
                            `${styles.transaction__input} ${styles.transaction__input__number}`}
                        type="number" 
                        id="amount" 
                        name="amount"
                        value={amount} 
                        // min={0}
                        onChange={(e) => {
                            setAmount(e.target.value)
                            const {amount, ...rest} = errors;
                            setErrors(rest)}}/> 
                </div>
                    {errors.amount ? <span className={styles.error}>{errors.amount.message}</span> : null}
                <div className={styles.transaction__control}>
                    <label className={styles.transaction__label}>Category:</label>
                        <select
                            className={errors.category?
                                `${styles.transaction__input} ${styles.transaction__input__select} ${styles.transaction__input__error}`:
                                `${styles.transaction__input} ${styles.transaction__input__select}`}
                            value={category} 
                            onChange={(e) => {
                                setCategory(e.target.value)
                                const {category, ...rest} = errors;
                                setErrors(rest)}}>
                            <option>------------</option>
                            {type==="expense"?
                                categoryList.filter(category=>category.type==="expense")
                                            .map((category,index)=>(
                                            <option 
                                                key={index} 
                                                value={category.categoryName}>
                                                    {category.categoryName}
                                            </option>
                            )):categoryList.filter(category=>category.type==="income")
                                            .map((category,index)=>(
                                            <option 
                                                key={index} 
                                                value={category.categoryName}>
                                                    {category.categoryName}
                                            </option>
                            ))}
                        </select>
                </div>    
                    {errors.category ? <span className={styles.error}>{errors.category.message}</span> : null}

                <div className={styles.transaction__control}>
                    <label className={styles.transaction__label}>Date</label>
                    <input 
                        className={theme==="light"?
                        errors.date?`${styles.transaction__input} ${styles.transaction__input__date} ${styles.transaction__input__error}`: 
                        `${styles.transaction__input} ${styles.transaction__input__date} `:
                        errors.date?`${styles.transaction__input} ${styles.transaction__input__date} ${styles.transaction__input__date__dark} ${styles.transaction__input__error}`: 
                        `${styles.transaction__input} ${styles.transaction__input__date} ${styles.transaction__input__date__dark}`
                        }
                        type="date" 
                        value={date} 
                        onChange={(e) => {
                            setDate(e.target.value)
                            const {date, ...rest} = errors;
                            setErrors(rest)}}/>
                </div>
                {errors.date ? <span  className={styles.error}>{errors.date.message}</span> : null}
                
                <div className={styles.transaction__bottom}>
                <input 
                        type="submit" 
                        value="Create" 
                        className={styles.transaction__button} />
                    {/* <input 
                        type="submit" 
                        value="Create" 
                        className={styles.transaction__button} /> */}
                </div>
            </form>
        </div>
        <RightMenu userId={userId}></RightMenu>
        </>

    )
}

export default NewTransaction;