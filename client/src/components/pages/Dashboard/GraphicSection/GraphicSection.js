import React, {useState, useEffect} from "react";
import axios from "axios";
import {arrayMonthStartDate, arrayMonthEndDate} from "../../../../helpers/getStartAndEndDate"
import {arrayMonthLabels} from "../../../../helpers/getLabelForChart"
import { useAmount } from "../../../../hooks/useAmount";

import {builtDataForChart} from "../../../../helpers/builtDataForChart"

import styles from "./../GraphicSection/GraphicSection.module.css"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { useSum } from "../../../../hooks/useSum";


const GraphicSection = ({userId, theme}) => {

    const [data, setData] = useState(
        [
            {milestone: 'Jan', Income: 400, Expenses: 200},
            {milestone: 'Feb', Income:0, Expenses:0},
            {milestone: 'Mar', Income: 0, Expenses: 0},
            {milestone: 'Apr', Income: 0, Expenses: 0},
            {milestone: 'May', Income: 500, Expenses: 200},
            {milestone: 'Jun', Income: 0, Expenses: 0},
            {milestone: 'Jul', Income:0, Expenses:0},
            {milestone: 'Aug', Income: 0, Expenses: 0},
            {milestone: 'Sep', Income: 0, Expenses: 0},
            {milestone: 'Oct', Income: 0, Expenses: 0},
            {milestone: 'Nov', Income: 0, Expenses: 0},
            {milestone: 'Dec', Income: 0, Expenses: 0},
        ]
    )
    
    // let am = useSum(userId,'income',arrayMonthStartDate,arrayMonthEndDate)
    // const [newData, setNewData] = useState(null)

    // const [arrayInfo, setArrayInfo] = useState([])
    // const [arrayIncome, setArrayIncome] = useState([])
    // const [arrayExpenses, setArrayExpenses] = useState([])


    // useEffect(() => {
    //     //Aqui se le pasa
    //     setData([])
    // }, [newData]);

    // useEffect(()=>{
    //     console.log(arrayInfo)
    // },[arrayInfo])


    // useEffect(() => {

    //     for(let i=0;i<arrayMonthStartDate.length;i++){
    //         axios.post("http://localhost:8000/api/transactions/period",{
    //             userId: userId,
    //             date: {$gte: new Date(arrayMonthStartDate[i]), $lt: new Date(arrayMonthEndDate[i])},
    //             type: "income",
    //         }, {withCredentials: true})
    //             .then(res => {
    //                 console.log(res.data)
    //                 setArrayInfo([...arrayInfo,2])
                    
    //                 // if(res.data==[]){
    //                 //     //array.push(0)
    //                 //     setArrayIncome([...arrayIncome,0])
    //                 //     console.log("Hola"+arrayIncome)
                    
    //                 // }
    //                 // else{
    //                 //     let sum = [0]
    //                 //     res.data.forEach(el=>sum.push(el.amount))
    //                 //     let suma = sum.reduce((a,b)=>(a+b))
    //                 //     //array.push(suma)
    //                 //     setArrayExpenses(...arrayIncome,suma)

    //                 // }
    //               //setArrayIncome(array)
    //             })
    //             .catch(error => console.log(error)); 
    //         }

            
            // for(let i=0;i<arrayMonthStartDate.length;i++){
            //     axios.post("http://localhost:8000/api/transactions/period",{
            //         userId: userId,
            //         date: {$gte: new Date(arrayMonthStartDate[i]), $lt: new Date(arrayMonthEndDate[i])},
            //         type: "expenses",
            //     }, {withCredentials: true})
            //         .then(res => {
            //             console.log(res.data)
                        
            //             if(res.data==""){
            //                 //array.push(0)
            //                 setArrayExpenses([...arrayExpenses,0])
            //                 //console.log(arrayIncome)
                        
            //             }
            //             else{
            //                 let sum = []
            //                 res.data.forEach(el=>sum.push(el.amount))
            //                 let suma = sum.reduce((a,b)=>(a+b))
            //                 //array.push(suma)
            //                 setArrayExpenses([...arrayExpenses,suma])
            //                 // console.log("yy"+array)
                       
            //                 //console.log(arrayIncome)
            //             }
            //            //setArrayExpenses(array)
            //         })
            //         .catch(error => console.log(error));    
            //     }
            
        
    // }, []);

        
    // useEffect(() => {
    //     // console.log(builtDataForChart(arrayMonthLabels,arrayy, arrayy2))
    //     console.log(arrayMonthLabels)
    // }, [arrayIncome, arrayExpenses]);

    const handleGraphYearly = () =>{
        // console.log(am)
        setData([])
    }

    const handleGraphMonthly = () =>{
        setData([])
    }

    const handleGraphWeekly = () =>{
        setData([])
    }

    const handleGraphDaily= () =>{
        setData([])
    }

    //Theme
    const [currentTheme, setCurrentTheme] = useState({});
    useEffect(() => {
        if(theme=="light"){
            setCurrentTheme(
                {
                    backgroundColor:"#FFFFFF",
                    color:"hsl(0, 0%, 0%)"
                }
            )
        }else{
            setCurrentTheme(
                {
                    backgroundColor:"#2C2F33",
                    color:"#FFFFFF"
                }
            )
        }    
    }, [theme]);

    return (
        <div className={styles.graphic__section}>

            <div className={styles.graphic__label}>
                <h2 className={styles.graphic__title}>My balance history</h2>
                <div className={styles.graphic__buttons}>
                    <button onClick={handleGraphYearly}>Y</button>
                    <button onClick={handleGraphMonthly}>M</button>
                    <button onClick={handleGraphWeekly}>W</button>
                    <button onClick={handleGraphDaily}>D</button>
                </div>
            </div>

            <div className={styles.graphic}>
                <ResponsiveContainer>
                <AreaChart width={730} height={280} data={data}
                margin={{ top: 30, right: 40, left: 10, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor="#00D6BD" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#89faed" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor="#ff6b89" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#faafbe" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="milestone" tick={{ fill: currentTheme.color }} tickLine={{ stroke: currentTheme.color }} />
                    <YAxis tick={{ fill: currentTheme.color }} tickLine={{ stroke: currentTheme.color }} />
                    <CartesianGrid className={styles.grid} strokeDasharray="1 16" />
                    <Legend verticalAlign="bottom"></Legend>
                    <Tooltip contentStyle={{backgroundColor: currentTheme.backgroundColor, color: currentTheme.color, borderRadius:"0.5rem", fontSize:"0.8rem", border:"none"}} /> 
                
                    <Area type="monotone" dataKey="Income" stroke="#00D6BD" fillOpacity={0.5} fill="url(#colorPv)" />
                    <Area type="monotone" dataKey="Expenses" stroke="#ff7a95" fillOpacity={0.6} fill="url(#colorUv)" />
                </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>

    )
}

export default GraphicSection;