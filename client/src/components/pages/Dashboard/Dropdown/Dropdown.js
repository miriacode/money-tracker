import React from "react";
import { useState } from "react" ; 

//Styles
import styles from "./Dropdown.module.css"


const Dropdown = ( { selected , setSelected } ) => {
    const [ isActive , setIsActive ] = useState ( false ) ;
    const options = [ "React" , "Vue" , "Angular"] ;

    return ( 
        <div className={styles.dropdown}> 
            <div className={styles.dropdownBtn} onClick = {(e) =>setIsActive (!isActive)}>
                {selected}
                {/* <span className="fas fa-caret-down"></span>  */}
            </div>
            {isActive && ( 
                <div className={styles.dropdownContent}> 
                {options.map((option) =>(
                    <div
                         onClick={(e)=>{
                            setSelected(option)
                            setIsActive(false)
                        }}
                        className={styles.dropdownItem}>
                    {option}
                    </div>
                ))}
                </div>
            )};
        </div>
    )
}

export default Dropdown;