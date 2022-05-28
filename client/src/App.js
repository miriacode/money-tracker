import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu'
import SideMenu from "./components/sideMenu/SideMenu";

import Dashboard from './components/pages/Dashboard/Dashboard'
import AllTransactions from './components/pages/Transactions/AllTransactions'
import Transaction from './components/pages/Transaction/Transaction'
import NewTransaction from "./components/pages/NewTransaction/NewTransaction";
import UpdateTransaction from "./components/pages/UpdateTransaction/UpdateTransaction";
import Categories from "./components/pages/Categories/Categories";
import NewCategory from "./components/pages/NewCategory/NewCategory";
import UpdateCategory from "./components/pages/UpdateCategory/UpdateCategory";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

//Components: Errors
import AuthenticationError from "./components/Errors/AuthenticationError/AuthenticationError";

//To get cookies and decodify jwt
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function App() {

  const[cookies] = useCookies(['usertoken'])
  const[userId, setUserId] = useState(null)

  useEffect(() => {
    console.log(cookies.usertoken)
     
    if(cookies.usertoken!==undefined){
      console.log(jwt_decode(cookies.usertoken)._id)
      setUserId(jwt_decode(cookies.usertoken)._id)
    }
    
  }, [cookies.usertoken]);
  
  return (
    <div className="App">
      <BrowserRouter>
        {userId?<Menu />:null}
        {userId?<SideMenu userId={userId} />:null}
        <Routes>
          <Route exact path="/" element={userId?<Navigate to="/dashboard"/>:<Login />} />
          <Route exact path="/register" element={userId?<Navigate to="/dashboard"/>:<Register />} />
          <Route exact path="/dashboard" element={userId?<Dashboard userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/transactions" element={userId?<AllTransactions userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/categories" element={userId?<Categories userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/categories/new" element={userId?<NewCategory userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/categories/update/:id"element={userId?<UpdateCategory userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/transactions/:id"element={userId?<Transaction />:<AuthenticationError/>} />
          <Route exact path="/transactions/new"element={userId?<NewTransaction userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/transactions/update/:id"element={userId?<UpdateTransaction userId={userId}/>:<AuthenticationError/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;