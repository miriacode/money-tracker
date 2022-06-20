import React, {useState, useEffect} from "react";
import axios from "axios";

import styles from "./../GraphicSection/GraphicSection.module.css"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const GraphicSection = ({theme}) => {
    const [data, setData] = useState([
            {milestone: 'Jan', Income: 0, Expenses: 0},
            {milestone: 'Feb', Income:0, Expenses:0},
            {milestone: 'Mar', Income: 0, Expenses: 0},
            {milestone: 'Apr', Income: 0, Expenses: 0},
            {milestone: 'May', Income: 0, Expenses: 0},
            {milestone: 'Jun', Income: 0, Expenses: 0},
            {milestone: 'Jul', Income:0, Expenses:0},
            {milestone: 'Aug', Income: 0, Expenses: 0},
            {milestone: 'Sep', Income: 0, Expenses: 0},
            {milestone: 'Oct', Income: 0, Expenses: 0},
            {milestone: 'Nov', Income: 0, Expenses: 0},
            {milestone: 'Dec', Income: 0, Expenses: 0},
        ])

        // const fu = (arrayLabels, arrayIncome, arrayExpenses) =>{
        //     let newData = []
        //     for(let i=0; i<arrayLabels.length; i++){
        //         newData.push(new Object(arrayLabels[i],arrayIncome[i],arrayExpenses[i]))
        //     }
        //     return newData
        // }

        // useEffect(() => {
            
        // }, []);

        // useEffect(() => {
        //     //By default: Yearly
        //     let todayArray = new Date().toDateString().split(" ")
        //     let beginningOfThisYear = `${todayArray[3]}-01-01`
        //     let nextYearArray = new Date(new Date().getFullYear()+1, 0, 1).toDateString().split(" ")
        //     let beginningOfNextYear = `${nextYearArray[3]}-01-01`
    
        //     axios.post("http://localhost:8000/api/transactions/period",{
        //         userId: userId,
        //         date: {$gte: new Date(beginningOfThisYear), $lt: new Date(beginningOfNextYear)},
        //         type: "income",
        //     }, {withCredentials: true})
        //         .then(res => {
        //             let response = res.data
        //             let array = [0]
        //             response.map(el=>array.push(el.amount))
        //             let totalAmount = array.reduce((a,b)=>a+b)
        //             setTotalIncome(totalAmount)
        //             }
        //         )
        //         .catch(error => console.log(error));
    
        //         axios.post("http://localhost:8000/api/transactions/period",{
        //             userId: userId,
        //             date: {$gte: new Date(beginningOfThisYear), $lt: new Date(beginningOfNextYear)},
        //             type: "expense",
        //         }, {withCredentials: true})
        //             .then(res => {
        //                 let response = res.data
        //                 let array = [0]
        //                 response.map(el=>array.push(el.amount))
        //                 let totalAmount = array.reduce((a,b)=>a+b)
        //                 setTotalExpenses(totalAmount)
        //                 }
        //             )
        //             .catch(error => console.log(error));
        // }, [userId]);


    // const data = [
    //     {name: 'Jan', Income: 2400, Expenses: 2000},
    //     {name: 'Feb', Income: 800, Expenses: 400},
    //     {name: 'Mar', Income: 2400, Expenses: 1500},
    //     {name: 'Apr', Income: 2500, Expenses: 2000},
    //     {name: 'May', Income: 2700, Expenses: 1700},
    //     {name: 'Jun', Income: 1300, Expenses: 1900},
    //     {name: 'Jul', Income: 800, Expenses: 400},
    //     {name: 'Aug', Income: 2400, Expenses: 1500},
    //     {name: 'Sep', Income: 2500, Expenses: 2000},
    //     {name: 'Oct', Income: 2700, Expenses: 1700},
    //     {name: 'Nov', Income: 1300, Expenses: 1900},
    //     {name: 'Dec', Income: 2000, Expenses: 1300},
    // ];


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
                    <button >Y</button>
                    <button >M</button>
                    <button >W</button>
                    <button>D</button>
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
                    {/* <YAxis/> */}
                    <YAxis tick={{ fill: currentTheme.color }} tickLine={{ stroke: currentTheme.color }} />
                    <CartesianGrid className={styles.grid} strokeDasharray="1 16" />
                    {/* <Legend layout="vetical" verticalAlign="middle" align="right" height={36} width={130}/> */}
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