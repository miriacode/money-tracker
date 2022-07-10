import React from "react";
import StadisticSection from "./StadisticsSection/StadisticSection"
import GraphicSection from "./GraphicSection/GraphicSection"

import RightMenu from "../../RightMenu/RightMenu";

//CSS
import styles from "./Dashboard.module.css"


const Dashboard = () => {
    return (
        <>
            <div className={styles.page}>
                <h2 className={styles.page__title}>Dashboard</h2>
                <StadisticSection/>
                <GraphicSection></GraphicSection>
            </div> 
            <RightMenu></RightMenu>
        </>
    )
}

export default Dashboard;