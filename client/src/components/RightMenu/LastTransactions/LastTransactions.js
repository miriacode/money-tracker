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

    let lightTheme = {
        blue:{
          backgroundColor:"#daefff"
        },
        red:{
          backgroundColor:"#ffe3e8"
        }
      }
    
      let darkTheme = {
        blue:{
          backgroundColor:"#bed5f7"
        },
        red:{
          backgroundColor:"#ffc4cf"
        }
      }

    return (
        <div className={styles.lastTransactions}>

            <h2 className={styles.lastTransactions__title}>LastTransactions</h2>

            <ul className={styles.lastTransactions__list}>

                {lastTransactions.map((transaction,i)=>
                <li className={styles.transaction} key={i}>
                    {transaction.type==="income"?

                    <div className={styles.transaction__icon} style={theme==="light"?lightTheme.blue:darkTheme.blue}>
                        <ArrowDropUpIcon style={{fontSize:27, color:"#048ffe"}}></ArrowDropUpIcon>
                    </div>:

                    <div className={styles.transaction__icon} style={theme==="light"?lightTheme.red:darkTheme.red}>
                        <ArrowDropDownIcon style={{fontSize:27, color:"#ff4166"}}></ArrowDropDownIcon>
                    </div>
                    }

                    <div className={styles.transaction__middle}>
                        <span className={styles.transaction__title}>{transaction.title}</span>
                        <span className={styles.transaction__date}>May, 25 2020</span>
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