import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//Material UI Icon
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

//Styles
import styles from "./TransactionRow.module.scss"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const TransactionRow = ({transaction, deleteTransaction, theme}) => {
  let { _id, type, title, amount, category, date } = transaction;

  let newDate = new Date(date).toUTCString().split(" ")
  date = `${newDate[2]} ${newDate[1]}, ${newDate[3]}`

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

  const [color, setColor] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/"+category, {withCredentials: true})
      .then(res => {
          console.log(res.data[0])
          console.log(res.data[0].color)
          let defaultColor = res.data[0].color



          if(theme==="light"){
            let newColor = defaultColor.slice(0,-5)+"40%)"
            setColor(newColor)
          }else{
            setColor(defaultColor)
          }
      }
      )
      .catch(error => console.log(error.response.data.errors));
    
  }, [category, theme]);

  useEffect(() => {
      if(theme==="light"){
        let oldColor = color
        //let newColor = oldColor.slice(0,-1)+" ,0.99)"
        let newColor = oldColor.slice(0,-5)+"40%)"
        setColor(newColor)
        // console.log(oldColor)
      }

  }, [category,theme]);


  return (
    <tr className={styles.row}>
      {type==="income"?
          <td  className={`${styles.cell} ${styles.flex}`}>
              <div className={styles.icon} style={theme==="light"?lightTheme.blue:darkTheme.blue}>
                <ArrowDropUpIcon style={{fontSize:27, color:"#048ffe"}}></ArrowDropUpIcon>
              </div>
          </td>:
          <td className={`${styles.cell} ${styles.flex}`}>
              <div className={styles.icon} style={theme==="light"?lightTheme.red:darkTheme.red}>
                <ArrowDropDownIcon style={{fontSize:27, color:"#ff4166"}}></ArrowDropDownIcon>
              </div>
          </td>}
      <td  className={styles.cell}>{title}</td>
      <td  className={styles.cell}>$ {amount}</td>
      <td  className={`${styles.cell} ${styles.label}`}><span style={{color:color,borderColor:`${color}`}}>{category}</span></td>
      <td  className={`${styles.cell} ${styles.center}`}>{date}</td>
      <td  className={`${styles.cell} ${styles.center}`}>
        <Link className={styles.button__view} to={"/transactions/"+_id}><SearchIcon></SearchIcon></Link>
        <button className={styles.button__delete} onClick={() => deleteTransaction(_id)}><DeleteIcon></DeleteIcon></button>
     </td>
    </tr>
  );
};

export default TransactionRow;
