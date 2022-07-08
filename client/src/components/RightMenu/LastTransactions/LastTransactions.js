import React, {useEffect, useState} from "react";
import axios from "axios";

//Material UI Icons
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

//Styles
import styles from "./../LastTransactions/LastTransactions.module.css"
import { makeStyles } from "@mui/material";


const LastTransactions = ({userId, theme}) => {

    const [lastTransactions, setLastTransactions] = useState([])
    const [date, setDate] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/transactions/last5/find/"+userId,{withCredentials: true})
            .then(res => {
                setLastTransactions(res.data)
                // lastTransactions.forEach(transaction=> {
                //     let date1 = new Date(transaction.date).toUTCString().split(" ")
                //     // let date2 = date1
                //     // let newDate = `${date1[2]} ${date1[1]}, ${date1[3]}`
                //     // setDate()
                // })
                // setLastTransactions(y)
               
            })
            .catch(error => console.log(error));
    }, [userId]);

  //   useEffect(() =>{
  //     axios.get("http://localhost:8000/api/transactions/"+id,{withCredentials: true})
  //         .then(res => {
  //             setTransaction(res.data)
              
  //         })
  //         .catch(error => console.log(error));
  // }, [id])

    let lightTheme = {
        blue:{
          backgroundColor:"transparent"
        },
        red:{
          backgroundColor:"transparent"
        }
      }
    
      let darkTheme = {
        blue:{
          backgroundColor:"transparent"
        },
        red:{
          backgroundColor:"transparent"
        }
      }

    return (
        <div className={styles.lastTransactions}>

            <h2 className={styles.lastTransactions__title}>Last Transactions</h2>

            <ul className={styles.lastTransactions__list}>

                {lastTransactions.map((transaction,i)=>
                <li className={styles.transaction} key={i}>
                    {transaction.type==="income"?

                    <div className={styles.transaction__icon} style={theme==="light"?lightTheme.blue:darkTheme.blue}>
                        <ArrowDropUpIcon style={{fontSize:35, color:"#048ffe"}}></ArrowDropUpIcon>
                    </div>:

                    <div className={styles.transaction__icon} style={theme==="light"?lightTheme.red:darkTheme.red}>
                        <ArrowDropDownIcon style={{fontSize:35, color:"#ff4166"}}></ArrowDropDownIcon>
                    </div>
                    }

                    <div className={styles.transaction__middle}>
                        <span className={styles.transaction__title}>{transaction.title}</span>
                        <span className={styles.transaction__date}>{transaction.date.split("T")[0]}</span>
                    </div>
                    <div className={styles.transaction__end}>
                        <span className={styles.transaction__amount}>${transaction.amount}</span>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}

export default LastTransactions;