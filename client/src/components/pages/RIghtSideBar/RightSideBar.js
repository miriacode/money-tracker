import React from "react";
import Calendar from "../RIghtSideBar/Calendar/Calendar";
import LastTransactions from "../RIghtSideBar/LastTransactions/LastTransactions";


const RightSideBar = ({userId}) => {
    return (
        <div>
            <Calendar/>
            <LastTransactions userId={userId}/>
        </div>
    )
}

export default RightSideBar;