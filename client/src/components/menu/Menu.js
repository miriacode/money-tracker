import {Link} from "react-router-dom";
import React from "react";

//Components
import ButtonLogout from "./ButtonLogOut/ButtonLogout";

//Styles
import styles from "./../Menu/Menu.module.scss"

//Assets
import logoLight from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"

//Material Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DiscountIcon from '@mui/icons-material/Discount';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';


const Menu = ({theme}) => {
    return (
        <div className={styles.menu}>
            <div className={styles.menu__brand}>
                <img className={styles.menu__logo} src={theme==="light"?logoLight:logoDark}></img>
                <h3 className={styles.menu__title}>MoneyTracker</h3> 
            </div>
            
            <ul className={styles.menu__list}>
                <li className={styles.menu__item}>
                    <DashboardIcon className={styles.menu__icon}></DashboardIcon>
                    {/* <img className={styles.menu__icon} src={DashboardIcon}></img> fontSize="medium*/}
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className={styles.menu__item}>
                    <ReceiptIcon className={styles.menu__icon}></ReceiptIcon>
                    <Link to="/transactions">Transactions</Link>
                </li>
                <li className={styles.menu__item}>
                    <DiscountIcon className={styles.menu__icon}></DiscountIcon>
                    <Link to="/categories">Categories</Link>
                    </li>
                <li className={styles.menu__item}>
                    <EqualizerIcon className={styles.menu__icon}></EqualizerIcon>
                    <a href="#">Reports</a>
                </li>
                <li className={styles.menu__item}>
                    <PersonIcon className={styles.menu__icon}></PersonIcon>
                    <Link to="/profile">Profile</Link>
                </li>
                <li className={styles.menu__item}>
                    <SettingsIcon className={styles.menu__icon}></SettingsIcon>
                    <a href="#">Settings</a>
                </li>
            </ul>
            <ButtonLogout></ButtonLogout>
        </div>
    )
}

export default Menu;