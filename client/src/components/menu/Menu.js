import {Link} from "react-router-dom";
import React from "react";

//Components
import ButtonLogout from "./ButtonLogOut/ButtonLogout";

//Styles
import styles from "./../Menu/Menu.module.scss"

//Assets
import logoLight from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"

// import DashboardIcon from '@mui/icons-material/Dashboard';

const Menu = ({theme}) => {
    return (
        <div className={styles.menu}>
            <div className={styles.menu__brand}>
                <img className={styles.menu__logo} src={theme==="light"?logoLight:logoDark}></img>
                <h3 className={styles.menu__title}>MoneyTracker</h3> 
            </div>
            
            <ul className={styles.menu__list}>
                <li className={styles.menu__item}>
                    {/* <img className={styles.menu__icon} src={DashboardIcon}></img> */}
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className={styles.menu__item}>
                    {/* <img className={styles.menu__icon} src={theme==="light"?logoTransactionLight:logoTransactionDark}></img> */}
                    <Link to="/transactions">Transactions</Link>
                </li>
                <li className={styles.menu__item}>
                    {/* <img className={styles.menu__icon} src={theme==="light"?logoCategoriesLight:logoCategoriesDark}></img> */}
                    <Link to="/categories">Categories</Link>
                    </li>
                <li className={styles.menu__item}>
                {/* <img className={styles.menu__icon} src={theme==="light"?logoDashboardLight:logoDashboardDark}></img> */}
                    <a href="#">Reports</a>
                </li>
                <li className={styles.menu__item}>
                    <Link to="/profile">Profile</Link>
                </li>
                <li className={styles.menu__item}>
                    <a href="#">Settings</a>
                </li>
            </ul>
            <ButtonLogout></ButtonLogout>
        </div>
    )
}

export default Menu;