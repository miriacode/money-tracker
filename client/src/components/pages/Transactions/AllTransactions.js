// import React, {useEffect, useState} from "react";
// import axios from "axios";
import {Link} from "react-router-dom";
import React from "react";

const AllTransactions = () => {
    return (
        <div>
            <h2>---AllTransactions---</h2>
            <Link to="/transactions/new">Add New</Link>
            <table>
                <tr>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>

                <tr>
                    <td>Row1</td>
                </tr>
                
            </table>
        </div>
    )
}

export default AllTransactions;