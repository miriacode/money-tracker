import React from "react";
import { useState, useEffect } from "react" ; 

//Styles
import styles from "./Dropdown.module.scss"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const Dropdown = ( {options, actions} ) => {
    const [selected, setSelected] = useState(options[0]);
    const [isActive, setIsActive ] = useState(false) ;

    useEffect(() => {
        if(selected===options[0]){
            actions[0]()
        }else if(selected===options[1]){
            actions[1]()
        }else if(selected===options[2]){
            actions[2]()
        }else if(selected===options[3]){
            actions[3]()
        }
    }, [selected]);

    return ( 
        <div className={styles.dropdown}> 
            <div className={styles.dropdownBtn} onClick = {() =>setIsActive (!isActive)}>
                <CalendarMonthIcon className={styles.dropdown__icon}></CalendarMonthIcon>
                <span>{selected}</span>
            </div>
            {isActive && ( 
                <div className={styles.dropdownContent}> 
                {options.filter((option)=>option!==selected).map((option) =>(
                    <div
                         onClick={()=>{
                            setSelected(option)
                            setIsActive(false)
                        }}
                        className={styles.dropdownItem}>
                        <CalendarMonthIcon ></CalendarMonthIcon>
                        <span>{option}</span>
                    </div>
                ))}
                </div>
            )}
        </div>   
    )
}

export default Dropdown;