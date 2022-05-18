// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
import React from "react";
import Calendar from "../Dashboard/Calendar/Calendar";
import LastTransactions from "../Dashboard/LastTransactions/LastTransactions";
import ShowTransaction from "./ShowTransaction/ShowTransaction";

const Transaction = () => {
    return (
        <div>
            <h2>---Transaction---</h2>
            <ShowTransaction></ShowTransaction>
            <Calendar></Calendar>
            <LastTransactions></LastTransactions>
        </div>
    )
}

export default Transaction;