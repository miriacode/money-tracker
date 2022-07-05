import React from "react";
import ShowTransaction from "./ShowTransaction/ShowTransaction";

const Transaction = ({userId, theme}) => {
    return (
        <div>
            <h2>---Transaction---</h2>
            <ShowTransaction userId={userId} theme={theme}></ShowTransaction>
        </div>
    )
}

export default Transaction;