import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu'
import SideMenu from "./components/sideMenu/SideMenu";

import Dashboard from './components/pages/Dashboard/Dashboard'
import AllTransactions from './components/pages/Transactions/AllTransactions'
import Transaction from './components/pages/Transaction/Transaction'
import NewTransaction from "./components/pages/NewTransaction/NewTransaction";
import Categories from "./components/pages/Categories/Categories";
import NewCategory from "./components/pages/NewCategory/NewCategory";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <SideMenu />
        <Switch>
          <Route path="/register" exact render={()=> <Register />} />
          <Route path="/login" exact render={()=> <Login />} />
          <Route path="/dashboard" exact render={()=> <Dashboard />} />
          <Route path="/transactions" exact render={() => <AllTransactions/>} />
          <Route path="/categories" exact render={() => <Categories/>} />
          <Route path="/categories/new" exact render={() => <NewCategory/>} />
          <Route path="/transaction/:id" exact render={()=> <Transaction />} />
          <Route path="/transactions/new" exact render={()=> <NewTransaction />} />
        </Switch>
      </BrowserRouter>
    </div>
  )}

export default App;
