import React, {useEffect, useState} from "react";
import axios from "axios";

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
        e.preventDefault()
        setTotalIncome(0)
        setTotalExpenses(0)
        let todayArray = new Date().toDateString().split(" ")//['Tue', 'May', '31', '2022']
        let beginningOfThisYear = `${todayArray[3]}-01-01`
        console.log(beginningOfThisYear)
        let nextYearArray = new Date(new Date().getFullYear()+1, 0, 1).toDateString().split(" ")
        let beginningOfNextYear = `${nextYearArray[3]}-01-01`
        console.log(beginningOfNextYear)
        getAmount('income',beginningOfThisYear,beginningOfNextYear)
        getAmount('expense',beginningOfThisYear,beginningOfNextYear)
    }

    const handleDateMonthly = (e) =>{
        e.preventDefault()
        setTotalIncome(0)
        setTotalExpenses(0)
        let todayArray = new Date().toDateString().split(" ")
        let monthNumber = getMonthNumber(todayArray[1])
        let beginningOfThisMonth = `${todayArray[3]}-${monthNumber}-01`
        console.log(beginningOfThisMonth)
        let today = new Date()
        let beginningOfNextMonthArray = new Date(today.getFullYear(), today.getMonth()+1, 1).toDateString().split(" ")
        let nextMonthNumber = getMonthNumber(beginningOfNextMonthArray[1])
        let beginningOfNextMonth = `${beginningOfNextMonthArray[3]}-${nextMonthNumber}-${beginningOfNextMonthArray[2]}`
        console.log(beginningOfNextMonth)
        getAmount('income',beginningOfThisMonth,beginningOfNextMonth)
        getAmount('expense',beginningOfThisMonth,beginningOfNextMonth)
    }

    const sumDays = (today, days)=>{
        today.setDate(today.getDate() + days);
        return today;
    }

    const getMonthNumber = (monthAbr) =>{
        let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        let monthNumber = "";
        monthArray.forEach((m,i)=>(m===monthAbr)?monthNumber=i+1:null)
        if(monthNumber<10){
            monthNumber="0"+monthNumber;
        }
        return monthNumber
    }

    const handleDateWeekly = (e) =>{
        e.preventDefault()
        setTotalIncome(0)
        setTotalExpenses(0)
        let todayArray = new Date().toDateString().split(" ")//['Tue', 'May', '31', '2022']
        let thisMonthNumber = getMonthNumber(todayArray[1])
        let today = `${todayArray[3]}-${thisMonthNumber}-${todayArray[2]}`
        console.log(today)
        let plusSevenDaysArray = sumDays(new Date(),7).toDateString().split(" ")
        let plusSevenDaysMonth = getMonthNumber(plusSevenDaysArray[1])
        let plusSevenDaysDay = `${plusSevenDaysArray[3]}-${plusSevenDaysMonth}-${plusSevenDaysArray[2]}`
        console.log(plusSevenDaysDay)
        getAmount('income',today,plusSevenDaysDay)
        getAmount('expense',today,plusSevenDaysDay)
    }

    const handleDateDaily = (e) =>{
        e.preventDefault()
        setTotalIncome(0)
        setTotalExpenses(0)
        let todayArray = new Date().toDateString().split(" ")//['Tue', 'May', '31', '2022']
        let thisMonthNumber = getMonthNumber(todayArray[1])
        let today = `${todayArray[3]}-${thisMonthNumber}-${todayArray[2]}`
        console.log(today)
        let tomorrowArray = sumDays(new Date(),1).toDateString().split(" ")
        let nextMonthNumber = getMonthNumber(tomorrowArray[1])
        let tomorrow = `${tomorrowArray[3]}-${nextMonthNumber}-${tomorrowArray[2]}`
        console.log(tomorrow)
        getAmount('income',today,tomorrow)
        getAmount('expense',today,tomorrow)
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