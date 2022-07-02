import React, {useState, useEffect} from "react";
import axios from "axios";

import styles from "./../GraphicSection/GraphicSection.module.css"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


// import t from "../../../../../../server/service/transactions.service"


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
    


    useEffect(() => {
        axios.post("http://localhost:8000/api/transactions/period3",{
            userId:userId,
            startDate:"2022-01-01",
            endDate:"2022-12-31",
            period:"THISYEAR"
        }, {withCredentials: true})
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error));
    
    }, []);
        


    const handleThisYearGraph = () =>{
        setData([])
    }
    // const handleGraphMonthly = () =>{
    //     setData([])
    // }

    // const handleGraphWeekly = () =>{
    //     setData([])
    // }

    // const handleGraphDaily= () =>{
    //     setData([])
    // }

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
                    <button onClick={handleThisYearGraph}>Y</button>
                    {/* <button onClick={handleGraphMonthly}>M</button>
                    <button onClick={handleGraphWeekly}>W</button>
                    <button onClick={handleGraphDaily}>D</button> */}
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