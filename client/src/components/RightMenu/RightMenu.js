import React from "react";

import Calendario from "./../RightMenu/Calendar/Calendar"

//Styles
// import styles from "./../RightMenu/Calendar/"
import styles from "./../RightMenu/RightMenu.module.css"

const RightMenu = () => {
    return (
        <div className={styles.rightMenu}>
           <Calendario></Calendario>
        </div>
    )
}

export default RightMenu;