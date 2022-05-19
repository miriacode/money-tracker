import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

    

const ShowTransaction = () => {
    
    const {id} = useParams();
    const [transaction, setTransaction] = useState({});

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions/"+id)
            .then(res => {
                console.log(res.data)
                setTransaction(res.data)
               
            })
            .catch(error => console.log(error));
    }, [id])
    

    return (
        <div>
            <h2>Show Transaction</h2>
            <p>{transaction.type}</p>
            <p>{transaction.title}</p>
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
            <p>{transaction.category}</p>
        </div>
    )
}

export default ShowTransaction;