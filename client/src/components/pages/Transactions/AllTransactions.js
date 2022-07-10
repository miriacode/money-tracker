import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import TransactionRow from "./TransitionRow/TransitionRow";

//Styles
import styles from "./Transactions.module.scss"

import AddIcon from '@mui/icons-material/Add';

// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//Theme
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { deepOrange } from "@mui/material/colors";
// import { style } from "@mui/system";
// import { border } from "@mui/system";

//import { deepOrange } from '@mui/material/colors';

// const LightTheme = {
//     palette: {
//       primary: {
//         main: "#04ae9d"
//         // contrastText: '#ffcc00'
//       },
//       secondary: {
//         main: "#2d7cd6"
//       },
//       text: {
//         primary:"#000000"
//       }
//     },
//     notchedOutline: {
//         borderWidth: "10px",
//         borderColor: "red !important"
//     },
//     typography: {
//         "fontFamily": `"Poppins", sans-serif`,
//         "fontSize": 14.5,
//         "fontWeightLight": 300,
//         "fontWeightRegular": 400,
//         "fontWeightMedium": 500
//        }
//   };

//   const DarkTheme = {
//     palette: {
//       primary: {
//         main: "#04ae9d"
//         // contrastText: '#ffcc00'
//       },
//       secondary: {
//         main: "#2d7cd6"
//       },
//       text: {
//         primary:"#000000",
//         secondary: "#0000000"
//       },
//       borderColor: "yellow !important"
//     //   divider:deepOrange[900]
//     },
//     typography: {
//         "fontFamily": `"Poppins", sans-serif`,
//         "fontSize": 14.5,
//         "fontWeightLight": 300,
//         "fontWeightRegular": 400,
//         "fontWeightMedium": 500
//        }
//   };

//   const lightTheme = createTheme(LightTheme);
//   const darkTheme = createTheme(DarkTheme);

// const themes = createTheme({
//     palette: {
//       primary: {
//         main: "#fc4103"
//       },
//       secondary: {
//         main: "#3239fa"
//       }
//     }
//   });
// const darkTheme = createTheme({
//     palette: {
//       mode: 'dark',
//     },
//   });
// const getDesignTokens = (mode: PaletteMode) => ({
//     palette: {
//       mode,
//       ...(mode === 'light'
//         ? {
//             // palette values for light mode
//             primary: amber,
//             divider: amber[200],
//             text: {
//               primary: grey[900],
//               secondary: grey[800],
//             },
//           }
//         : {
//             // palette values for dark mode
//             primary: deepOrange,
//             divider: deepOrange[700],
//             background: {
//               default: deepOrange[900],
//               paper: deepOrange[900],
//             },
//             text: {
//               primary: '#fff',
//               secondary: grey[500],
//             },
//           }),
//     },
//   });

// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params: GridValueGetterParams) =>
//         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
//   ];
  
//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     { id: 10, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 11, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];


const AllTransactions = ({userId}) => {
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions/find/"+userId,{withCredentials: true})
            .then(res => {
                setTransactionList(res.data)
            })
            .catch(error => {console.log(error)});
    }, [userId])

    const deleteTransaction = (_id) =>{
        axios.delete("http://localhost:8000/api/transactions/"+_id,{withCredentials: true})
            .then(res => {
                let newList = transactionList.filter(transaction => transaction._id !== _id);
                setTransactionList(newList);
            })
    }

    return (
        <div className={styles.page}>
            <h2 className={styles.page__title}>All Transactions</h2>
            {/* 
            <ThemeProvider theme={lightTheme}>
                <div className={styles.table} >
                <DataGrid
                className={styles.table__grid}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    sx={{borderColor: 'transparent'}}
                    
                />
                </div>
            </ThemeProvider>
             */}
            <div className={styles.scroll}>
            <table className={styles.table}>
                <thead className={styles.table__head}>
                    <tr className={styles.table__tr}>
                        <th className={styles.table__th}>Type</th>
                        <th className={styles.table__th}>Title</th>
                        <th className={styles.table__th}>Amount</th>
                        <th className={styles.table__th}>Category</th>
                        <th className={styles.table__th}>Date</th>
                        <th className={styles.table__th}>Actions</th>
                    </tr>
                </thead>
               
                    <tbody className={styles.table__body}>
                         
                        {transactionList.length > 0 ? (
                            transactionList.map((transaction) => (
                            
                            <TransactionRow
                                key={transaction.id}
                                transaction={transaction}
                                // setDataToEdit={setDataToEdit}
                                deleteTransaction={deleteTransaction}
                            />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">You haven't registered any transaction yet.</td>
                            </tr>
                        )}
                    </tbody>
                
            </table>
            </div>
            <div className={styles.button}>
                <Link to="/transactions/new"><AddIcon style={{fontSize:30}}></AddIcon></Link>
            </div>
        </div>
    )
}

export default AllTransactions;