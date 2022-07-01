// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useAmount = (userId,type,arrayMonthStartDate,arrayMonthEndDate) => {
//     const [array, setArray] = useState([]);

//         // let array = []

//         useEffect(() => {
            
        
//         // for(let i=0;i<arrayMonthStartDate.length;i++){
//             axios.post("http://localhost:8000/api/transactions/period",{
//                 userId: userId,
//                 date: {$gte: new Date(arrayMonthStartDate), $lt: new Date(arrayMonthEndDate)},
//                 type: type,
//             }, {withCredentials: true})
//                 .then(res => {
//                     console.log(res.data)
                    
//                     if(res.data==""){
//                         //array.push(0)
//                         setArray([...array,0])
//                         //console.log(arrayIncome)
//                         console.log(array)
//                     }
//                     else{
//                         let sum = []
//                         res.data.forEach(el=>sum.push(el.amount))
//                         let suma = sum.reduce((a,b)=>(a+b))
//                         array.push(suma)
//                         setArray([...array,suma])
//                         // console.log("yy"+array)
                   
//                         //console.log(arrayIncome)
//                     }
                   
//                 })
//                 .catch(error => console.log(error));    
//             // }
//         }, [userId,type,arrayMonthStartDate,arrayMonthEndDate]);
        
//        return {array}
// };