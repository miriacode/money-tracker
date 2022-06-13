import React, {useEffect, useState} from "react";
import axios from "axios";

const LastTransactions = ({userId}) => {

    const [lastTransactions, setLastTransactions] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/transactions/last5/find/"+userId,{withCredentials: true})
            .then(res => setLastTransactions(res.data))
            .catch(error => console.log(error));
    }, [userId]);

    return (
        <div>
            <h2>LastTransactions</h2>
            <ul>
                {lastTransactions.map((transaction,i)=><li key={i}>{transaction.type} {transaction.title}</li>)}
            </ul>
        </div>
    )
}

export default LastTransactions;