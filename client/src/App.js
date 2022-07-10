import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu'
import SideMenu from "./components/sideMenu/SideMenu";
import Dashboard from './components/pages/Dashboard/Dashboard'
import AllTransactions from './components/pages/Transactions/AllTransactions'
import NewTransaction from "./components/pages/NewTransaction/NewTransaction";
import UpdateTransaction from "./components/pages/UpdateTransaction/UpdateTransaction";
import Categories from "./components/pages/Categories/Categories";
import UpdateCategory from "./components/pages/UpdateCategory/UpdateCategory";
import Profile from "./components/pages/Profile/Profile"
import UpdateProfile from "./components/pages/UpdateProfile/UpdateProfile"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthenticationError from "./components/Errors/AuthenticationError/AuthenticationError";

//Styles
import ShowTransaction from "./components/pages/ShowTransaction/ShowTransaction";

//ContextAPI
import { useContext } from "react";
import ThemeContext from './context/ThemeContext';
import AuthContext from './context/AuthContext';

function App() {

  const { theme } = useContext(ThemeContext);
  const { userId } = useContext(AuthContext);

  return (
    <div className="App" data-theme={theme}>
      <BrowserRouter>
        {userId?<Menu/>:null}
        {userId?<SideMenu/>:null}

        <Routes>
          <Route exact path="/" element={userId?<Navigate to="/dashboard"/>:<Login />} />
          <Route exact path="/register" element={userId?<Navigate to="/dashboard"/>:<Register />} />
          <Route exact path="/dashboard" element={userId?<Dashboard/>:<AuthenticationError/>} />
          <Route exact path="/transactions" element={userId?<AllTransactions/>:<AuthenticationError/>} />
          <Route exact path="/transactions/:id"element={userId?<ShowTransaction/>:<AuthenticationError/>} />
          <Route exact path="/transactions/new"element={userId?<NewTransaction/>:<AuthenticationError/>} />
          <Route exact path="/transactions/update/:id"element={userId?<UpdateTransaction/>:<AuthenticationError/>} />
          <Route exact path="/categories" element={userId?<Categories userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/profile"element={userId?<Profile userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/profile/edit"element={userId?<UpdateProfile userId={userId}/>:<AuthenticationError/>} />
        </Routes>

      </BrowserRouter>
    </div>
   

  )
}

export default App;