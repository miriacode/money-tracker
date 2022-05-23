// import React, {useEffect, useState} from "react";
// import axios from "axios";
import {Link} from "react-router-dom";
import React from "react";

//CSS
import './Menu.css'

const Menu = () => {
    return (
        <div className="menu">
            <h3>MoneyTracker</h3>
            <ul>
                {/* <li> <button component={Link} to="/dashboard">Dashboard</button></li>
                <li> <button component={Link} to="/transactions">Transactions</button></li>
                <li> <button component={Link} to="/categories">Categories</button></li> */}
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li>Reports</li>
                <li>Profile</li>
                <li>Settings</li>
                <li><Link to="/logout">LogOut</Link></li>
            </ul>
        </div>
    )
}

export default Menu;