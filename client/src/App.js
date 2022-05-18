import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu'
import SideMenu from "./components/sideMenu/SideMenu";

import Dashboard from './components/pages/Dashboard/Dashboard'
import AllTransactions from './components/pages/Transactions/AllTransactions'
import Transaction from './components/pages/Transaction/Transaction'


function App() {
  return (
    <div className="App">
      <BrowserRouter forceRefresh={true}>
        <Menu />
        <SideMenu />
        <Switch>
          <Route path="/dashboard" exact render={()=> <Dashboard />} />
          <Route path="/transactions" exact render={() => <AllTransactions/>} />
          <Route path="/transaction" exact render={()=> <Transaction />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
