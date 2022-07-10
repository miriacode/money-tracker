import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import RightMenu from "../../RightMenu/RightMenu";

//Styles
import styles from './ShowTransaction.module.css'

import EditIcon from '@mui/icons-material/Edit';

const ShowTransaction = ({userId}) => {
    
    const {id} = useParams();
    const [transaction, setTransaction] = useState({});

    const [date, setDate] = useState("");

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions/"+id,{withCredentials: true})
            .then(res => {
                setTransaction(res.data)
                let date = new Date(res.data.date).toUTCString().split(" ")
                setDate(`${date[2]} ${date[1]}, ${date[3]}`)
            })
            .catch(error => console.log(error));
    }, [id])
    

    return (
        <>
            <div className={styles.page}>
                <h2 className={styles.page__title}>Show Transaction</h2>
                <div className={styles.transaction}>
                
                    <Link to={"/transactions/update/"+id} className={styles.transaction__icon}>
                        <EditIcon/>
                    </Link>
                   
                    <div className={styles.transaction__control}>
                        <p className={styles.transaction__label}>Type:</p>
                        <p> {transaction.type}</p>
                    </div>
                    <div className={styles.transaction__control}>
                        <p className={styles.transaction__label}>Title:</p>
                        <p>{transaction.title}</p> 
                    </div>
                    <div className={styles.transaction__control}>
                        <p className={styles.transaction__label}>Description:</p>  
                        <p>{transaction.description}</p>
                    </div>
                    <div className={styles.transaction__control}>
                        <p className={styles.transaction__label}>Amount:</p>  
                        <p>$ {transaction.amount}</p>
                    </div>
                    <div className={styles.transaction__control}>
                        <p className={styles.transaction__label}>Category:</p> 
                        <p>{transaction.category}</p>
                    </div>
                    <div className={styles.transaction__control}>
                        <p className={styles.transaction__label}>Date</p>
                        <p>{date}</p>
                    </div>
                    
                </div>
                
            </div>
            <RightMenu userId={userId}></RightMenu>
        </>
    )
}

export default ShowTransaction;