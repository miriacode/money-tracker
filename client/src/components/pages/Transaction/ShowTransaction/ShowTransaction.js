import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";

const ShowTransaction = () => {
    
    const {id} = useParams();
    const [transaction, setTransaction] = useState({});

    const [date, setDate] = useState("");

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions/"+id,{withCredentials: true})
            .then(res => {
                console.log(res.data)
                setTransaction(res.data)
                let date = new Date(res.data.date).toUTCString().split(" ")
                setDate(`${date[2]} ${date[1]}, ${date[3]}`)
            })
            .catch(error => console.log(error));
    }, [id])
    

    return (
        <div>
            <h2>Show Transaction</h2>
            <div>
                <div>
                    <Link to={"/transactions/update/"+id}>Update</Link>
                </div>
                <p>Type:</p>
                <p> {transaction.type}</p>
                <p>Category:</p> 
                <p>{transaction.category}</p>
                <p>Title:</p>
                <p>{transaction.title}</p> 
                <p>Description:</p>  
                <p>{transaction.description}</p>
                <p>Amount:</p>  
                <p>{transaction.amount}</p>
                <p>Date</p>
                <p>{date}</p>
            </div>
            
        </div>
    )
}

export default ShowTransaction;