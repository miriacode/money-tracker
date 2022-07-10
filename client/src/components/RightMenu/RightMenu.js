import React from "react";

import Calendario from "./../RightMenu/Calendar/Calendar"
import LastTransactions from "../RightMenu/LastTransactions/LastTransactions";

//Styles
// import styles from "./../RightMenu/Calendar/"
import styles from "./../RightMenu/RightMenu.module.css";

const RightMenu = ({userId}) => {
    return (
        <div className={styles.rightMenu}>
           <Calendario></Calendario>
           <LastTransactions/>
        </div>
    )
}

export default RightMenu;