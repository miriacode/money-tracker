import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


import TransitionRow from "./TransitionRow/TransitionRow";

const AllTransactions = ({userId}) => {
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions/find/"+userId,{withCredentials: true})
            .then(res => {
                setTransactionList(res.data)
                
            })
            .catch(error => {console.log(error)});
    }, [userId])

    const deleteTransaction = (_id) =>{
        axios.delete("http://localhost:8000/api/transactions/"+_id)
            .then(res => {
                let newList = transactionList.filter(transaction => transaction._id !== _id);
                setTransactionList(newList);
            })
    }

    return (
        <div>
            <h2>---AllTransactions---</h2>
            <Link to="/transactions/new">Add New</Link>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionList.length > 0 ? (
                        transactionList.map((transaction) => (
                        <TransitionRow
                            key={transaction.id}
                            transaction={transaction}
                            // setDataToEdit={setDataToEdit}
                            deleteTransaction={deleteTransaction}
                        />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">You haven't registered any transaction yet.</td>
                        </tr>
                    )}
                </tbody>
                

               
                
            </table>
        </div>
    )
}

export default AllTransactions;