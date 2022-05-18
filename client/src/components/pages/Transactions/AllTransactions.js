import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


import TransitionRow from "./TransitionRow/TransitionRow";

const AllTransactions = () => {
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions")
            .then(res => {
                setTransactionList(res.data)
            })
            .catch(error => console.log(error));
    }, [])

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
                            // deleteData={deleteData}
                        />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">You haven't registered any transa yet.</td>
                        </tr>
                    )}
                </tbody>
                

               
                
            </table>
        </div>
    )
}

export default AllTransactions;