// import React, {useEffect, useState} from "react";
// import axios from "axios";
import {Link} from "react-router-dom";
import React from "react";

const Menu = () => {
    return (
        <div>
            <h3>Name Of The App</h3>
            <ul>
                <li> <Link to="/dashboard" className="btn btn-primary">Dashboard</Link></li>
                <li> <Link to="/transactions" className="btn btn-primary">Transactions</Link></li>
                <li>Reports</li>
                <li>Profile</li>
                <li>Settings</li>
                <li>LogOut</li>
            </ul>
        </div>
    )
}

export default Menu;