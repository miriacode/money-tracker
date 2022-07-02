import React, {useState, useEffect} from "react";
import axios from "axios";
//Styles
import styles from "./../GraphicSection/GraphicSection.module.css"
//Library
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
//Helpers
import { thisYear, thisMonth, nextMonth, thisMonday, nextMonday } from "../../../../helpers/dates";

const GraphicSection = ({userId, theme}) => {

    const [data, setData] = useState([])
    
    useEffect(() => {
        handleThisYearGraph()
    }, []); 
    const handleThisYearGraph = () =>{
        axios.post("http://localhost:8000/api/transactions/period3",{
            userId:userId,
            startDate:`${thisYear}-01-01`,
            endDate:`${thisYear+1}-01-01`,
            period:"THISYEAR"
        }, {withCredentials: true})
            .then(res => {
                setData(res.data)
            })
            .catch(error => console.log(error));
    }
    const handleThisMonthGraph = () =>{
        axios.post("http://localhost:8000/api/transactions/period3",{
            userId:userId,
            startDate:`${thisYear}-${thisMonth}-01`,
            endDate:`${thisYear}-${nextMonth}-01`,
            period:"THISMONTH"
        }, {withCredentials: true})
            .then(res => {
                setData(res.data)
            })
            .catch(error => console.log(error));
    }
    const handleThisWeekGraph = () =>{
        axios.post("http://localhost:8000/api/transactions/period3",{
            userId:userId,
            startDate:`${thisMonday}`,
            endDate:`${nextMonday}`,
            period:"THISWEEK"
        }, {withCredentials: true})
            .then(res => {
                setData(res.data)
            })
            .catch(error => console.log(error));
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
                    <button onClick={handleThisYearGraph}>Y</button>
                    <button onClick={handleThisMonthGraph}>M</button>
                    <button onClick={handleThisWeekGraph}>W</button>
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