import React, {useState, useEffect} from "react";

import styles from "./../GraphicSection/GraphicSection.module.css"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const GraphicSection = ({theme}) => {
    const data = [
        {name: 'Jan', Income: 2400, Expenses: 2000},
        {name: 'Feb', Income: 800, Expenses: 400},
        {name: 'Mar', Income: 2400, Expenses: 1500},
        {name: 'Apr', Income: 2500, Expenses: 2000},
        {name: 'May', Income: 2700, Expenses: 1700},
        {name: 'Jun', Income: 1300, Expenses: 1900},
        {name: 'Jul', Income: 800, Expenses: 400},
        {name: 'Aug', Income: 2400, Expenses: 1500},
        {name: 'Sep', Income: 2500, Expenses: 2000},
        {name: 'Oct', Income: 2700, Expenses: 1700},
        {name: 'Nov', Income: 1300, Expenses: 1900},
        {name: 'Dec', Income: 2000, Expenses: 1300},
    ];


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
        <div>
            <h2>Your balance history</h2>
            <div className={styles.graphic__container}>
                <p>%buttons%</p>
                <div className={styles.graphic}>
                
                <ResponsiveContainer>
                <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>


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
                    <XAxis dataKey="name" tick={{ fill: currentTheme.color }} tickLine={{ stroke: currentTheme.color }} />
                    {/* <YAxis/> */}
                    <YAxis tick={{ fill: currentTheme.color }} tickLine={{ stroke: currentTheme.color }} />
                    <CartesianGrid className={styles.grid} strokeDasharray="1 16" />
                    <Legend layout="vetical" verticalAlign="middle" align="right" height={36} width={130}/>
                 
                    <Tooltip contentStyle={{backgroundColor: currentTheme.backgroundColor, color: currentTheme.color, borderRadius:"0.5rem", fontSize:"0.8rem", border:"none"}} /> 
                    

                    <Area type="monotone" dataKey="Income" stroke="#00D6BD" fillOpacity={0.5} fill="url(#colorPv)" />
                    <Area type="monotone" dataKey="Expenses" stroke="#ff6b89" fillOpacity={0.6} fill="url(#colorUv)" />
                </AreaChart>
                </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default GraphicSection;