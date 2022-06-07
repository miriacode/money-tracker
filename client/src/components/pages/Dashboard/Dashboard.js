import React from "react";
import StadisticSection from "./StadisticsSection/StadisticSection"
import GraphicSection from "./GraphicSection/GraphicSection"
import Calendar from "./Calendar/Calendar";
import LastTransactions from "./LastTransactions/LastTransactions";

//CSS
// import styles from "./Dashboard.module.css"


const Dashboard = ({userId}) => {
    return (
        <div>
            <h2>---Dashboard---</h2>
            <p>{console.log(userId)}</p>
            <StadisticSection userId={userId}/>
            <GraphicSection/>
            <Calendar/>
            <LastTransactions userId={userId}/>
        </div>
    )
}

export default Dashboard;