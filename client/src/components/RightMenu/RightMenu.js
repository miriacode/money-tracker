import React from "react";

import Calendar from "./../RightMenu/Calendar/Calendar"

//Styles
// import styles from "./../RightMenu/Calendar/"
import styles from "./../RightMenu/RightMenu.module.css"

const RightMenu = () => {
    return (
        <div className={styles.rightMenu}>
           <Calendar></Calendar>
        </div>
    )
}

export default RightMenu;