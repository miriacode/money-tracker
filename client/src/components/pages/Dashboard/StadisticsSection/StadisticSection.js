import React, {useEffect, useState} from "react";
import axios from "axios";
import { set } from "mongoose";

const StadisticsSection = ({userId}) => {

    const [totalIncome, setTotalIncome] = useState();
    const [totalExpenses, setTotalExpenses] = useState();

    const getAmount = (type,startDate,endDate) =>{
        axios.post("http://localhost:8000/api/transactions/period",{
            userId: userId,
            date: {$gte: new Date(startDate), $lt: new Date(endDate)},
            type: type,
        }, {withCredentials: true})
            .then(res => {
                let response = res.data
                let array = [0]
                response.map(el=>array.push(el.amount))
                let totalAmount = array.reduce((a,b)=>a+b)
                if(type==='expense'){      
                    setTotalExpenses(totalAmount)
                }else{
                    setTotalIncome(totalAmount)
                }
            })
            .catch(error => console.log(error));
    }

    const handleDateYearly = (e) =>{
        setTotalIncome(0)
        setTotalExpenses(0)
        e.preventDefault()
        let todayArray = new Date().toDateString().split(" ")
        //['Tue', 'May', '31', '2022']
        let beginningOfThisYear = `${todayArray[3]}-01-01`
        let beginningOfNextYear = `${todayArray[3]+1}-01-01`
        getAmount('income',beginningOfThisYear,beginningOfNextYear)
        getAmount('expense',beginningOfThisYear,beginningOfNextYear)
    }

    const handleDateMonthly = (e) =>{
        setTotalIncome(0)
        setTotalExpenses(0)
        e.preventDefault()
        let todayArray = new Date().toDateString().split(" ")
        console.log(todayArray)
        let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        //This month
        let monthNumber = "";
        monthArray.forEach((m,i)=>(m===todayArray[1])?monthNumber=i+1:null)
        if(monthNumber<10){
            monthNumber="0"+monthNumber;
        }
        let beginningOfThisMonth = `${todayArray[3]}-${monthNumber}-01`
        console.log(beginningOfThisMonth)
        //Next Month
        let beginningOfNextMonth = "";
        if(monthNumber<12){

            console.log(monthNumber)
            let nextNumber = monthNumber.split("").slice(-1).reduce((a,b)=>a+b)
            nextNumber++
            if(nextNumber<10){
                nextNumber="0"+nextNumber;
            }
            beginningOfNextMonth = `${todayArray[3]}-${nextNumber}-01`
        }else{
            beginningOfNextMonth = `${todayArray[3]+1}-01-01`
        }
       
        console.log(beginningOfNextMonth)

        getAmount('income',beginningOfThisMonth,beginningOfNextMonth)
        getAmount('expense',beginningOfThisMonth,beginningOfNextMonth)
    }

    const handleDateWeekly = (e) =>{
        //setDateFilter(e.target.value);
    }

    const handleDateDaily = (e) =>{
        //setDateFilter(e.target.value);
    }

    return (
        <div>
            <h2>Stadistics Section</h2>
            <div>
                <button onClick={handleDateYearly}>Y</button>
                <button onClick={handleDateMonthly}>M</button>
                <button onClick={handleDateWeekly}>W</button>
                <button onClick={handleDateDaily}>D</button>
            </div>
            <p>Balance</p>
            <p>${totalIncome-totalExpenses}</p>
            <p>Total Expenses</p>
            <p>${totalExpenses}</p>
            <p>Total Income</p>
            <p>${totalIncome}</p>
        </div>
    )
}

export default StadisticsSection;