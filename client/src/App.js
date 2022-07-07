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
// import NewCategory from "./components/pages/NewCategory/NewCategory";
import UpdateCategory from "./components/pages/UpdateCategory/UpdateCategory";
import Profile from "./components/pages/Profile/Profile"
import UpdateProfile from "./components/pages/UpdateProfile/UpdateProfile"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

// import PruebaJS from "./components/pages/prueba"
// import PruebaUpdate from "./components/pages/pruebaUpdate"

//Components: Errors
import AuthenticationError from "./components/Errors/AuthenticationError/AuthenticationError";

//To get cookies and decodify jwt
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

//Styles
import useLocalStorage from 'use-local-storage'
import ShowTransaction from "./components/pages/ShowTransaction/ShowTransaction";

// import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
// import { amber, deepOrange, grey } from '@mui/material/colors';

// const [mode, setMode] = useState<PaletteMode>('light');
//   const colorMode = useMemo(
//     () => ({
//       // The dark mode switch would invoke this method
//       toggleColorMode: () => {
//         setMode((prevMode: PaletteMode) =>
//           prevMode === 'light' ? 'dark' : 'light',
//         );
//       },
//     }),
//     [],
//   );

  // Update the theme only if the mode changes
  // const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // const getDesignTokens = (mode: PaletteMode) => ({
  //       palette: {
  //         mode,
  //         ...(mode === 'light'
  //           ? {
  //               // palette values for light mode
  //               primary: amber,
  //               divider: amber[200],
  //               text: {
  //                 primary: grey[900],
  //                 secondary: grey[800],
  //               },
  //             }
  //           : {
  //               // palette values for dark mode
  //               primary: deepOrange,
  //               divider: deepOrange[700],
  //               background: {
  //                 default: deepOrange[900],
  //                 paper: deepOrange[900],
  //               },
  //               text: {
  //                 primary: '#fff',
  //                 secondary: grey[500],
  //               },
  //             }),
  //       },
  //     });

function App() {

  // const themes = useTheme();
  // const darkModeTheme = createTheme(getDesignTokens('dark'));

  const[cookies] = useCookies(['usertoken'])
  const[userId, setUserId] = useState(null)

  //To handle dark/light theme
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () =>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  useEffect(() => {
    console.log(cookies.usertoken)
     
    if(cookies.usertoken!==undefined){
      console.log(jwt_decode(cookies.usertoken)._id)
      setUserId(jwt_decode(cookies.usertoken)._id)
    }
    
  }, [cookies.usertoken]);
  
  return (
    // <ColorModeContext.Provider value={colorMode}>
    // <ThemeProvider themes={darkModeTheme}>
    <div className="App" data-theme={theme}>
      <BrowserRouter>
        {userId?<Menu theme={theme}/>:null}
        {userId?<SideMenu userId={userId} switchTheme={switchTheme} theme={theme}/>:null}
        <Routes>
          <Route exact path="/" element={userId?<Navigate to="/dashboard"/>:<Login />} />
          <Route exact path="/register" element={userId?<Navigate to="/dashboard"/>:<Register />} />
          <Route exact path="/dashboard" element={userId?<Dashboard userId={userId} theme={theme}/>:<AuthenticationError/>} />
          <Route exact path="/transactions" element={userId?<AllTransactions userId={userId} theme={theme}/>:<AuthenticationError/>} />
          <Route exact path="/categories" element={userId?<Categories userId={userId} theme={theme}/>:<AuthenticationError/>} />
          <Route exact path="/categories/update/:id"element={userId?<UpdateCategory userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/transactions/:id"element={userId?<ShowTransaction userId={userId} theme={theme}/>:<AuthenticationError/>} />
          <Route exact path="/transactions/new"element={userId?<NewTransaction userId={userId} theme={theme}/>:<AuthenticationError/>} />
          <Route exact path="/transactions/update/:id"element={userId?<UpdateTransaction userId={userId}/>:<AuthenticationError/>} />
          <Route exact path="/profile"element={userId?<Profile userId={userId} theme={theme}/>:<AuthenticationError/>} />
          <Route exact path="/profile/edit"element={userId?<UpdateProfile userId={userId} theme={theme}/>:<AuthenticationError/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
    // </ThemeProvider>
    // </ColorModeContext.Provider>
  )
}

export default App;