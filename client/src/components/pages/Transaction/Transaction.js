import React from "react";
import ShowTransaction from "./ShowTransaction/ShowTransaction";

const Transaction = ({userId, theme}) => {
    return (
        <div>
            <ShowTransaction userId={userId} theme={theme}></ShowTransaction>
        </div>
    )
}

export default Transaction;