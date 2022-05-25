// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
import React from "react";
import StadisticSection from "./StadisticsSection/StadisticSection"
import GraphicSection from "./GraphicSection/GraphicSection"
import Calendar from "./Calendar/Calendar";
import LastTransactions from "./LastTransactions/LastTransactions";

//CSS
import './Dashboard.css'

// import { useCookies } from "react-cookie";
// import jwt_decode from "jwt-decode";

const Dashboard = ({userId}) => {
    return (
        <div className="dashboard">
            <h2>---Dashboard---</h2>
            <p>uu{console.log(userId)}</p>
            <StadisticSection/>
            <GraphicSection/>
            <Calendar/>
            <LastTransactions/>
        </div>
    )
}

export default Dashboard;