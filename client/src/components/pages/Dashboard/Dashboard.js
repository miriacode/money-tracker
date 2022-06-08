import React from "react";
import StadisticSection from "./StadisticsSection/StadisticSection"
import GraphicSection from "./GraphicSection/GraphicSection"

import RightSideBar from "./../RIghtSideBar/RightSideBar"

//CSS
import styles from "./Dashboard.module.css"


const Dashboard = ({userId}) => {
    return (
        <div className={styles.page}>
            <h2 className={styles.page__title}>Dashboard</h2>
            <StadisticSection userId={userId}/>
            {/* <GraphicSection/>
            <RightSideBar userId={userId}></RightSideBar> */}
        </div>
    )
}

export default Dashboard;