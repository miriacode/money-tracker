// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
import React from "react";
import StadisticSection from "./StadisticsSection/StadisticSection"
import GraphicSection from "./GraphicSection/GraphicSection"
import Calendar from "./Calendar/Calendar";
import LastTransactions from "./LastTransactions/LastTransactions";

const Dashboard = () => {
    return (
        <div>
            <h2>---Dashboard---</h2>
            <StadisticSection/>
            <GraphicSection/>
            <Calendar/>
            <LastTransactions/>
        </div>
    )
}

export default Dashboard;