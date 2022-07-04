import React, {useEffect, useState} from "react";
import axios from "axios";

//Styles
import styles from "./StadisticsSection.module.css"
import Dropdown from "../Dropdown/Dropdown";

const StadisticsSection = ({userId}) => {

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    const [incomePercentage, setIncomePercentage] = useState(0);
    const [expensePercentage, setExpensePercentage] = useState(0);



    useEffect(() => {
        //By default: Yearly
        let todayArray = new Date().toDateString().split(" ")
        let beginningOfThisYear = `${todayArray[3]}-01-01`
        let nextYearArray = new Date(new Date().getFullYear()+1, 0, 1).toDateString().split(" ")
        let beginningOfNextYear = `${nextYearArray[3]}-01-01`

        axios.post("http://localhost:8000/api/transactions/period",{
            userId: userId,
            date: {$gte: new Date(beginningOfThisYear), $lt: new Date(beginningOfNextYear)},
            type: "income",
        }, {withCredentials: true})
            .then(res => {
                let response = res.data
                let array = [0]
                response.map(el=>array.push(el.amount))
                let totalAmount = array.reduce((a,b)=>a+b)
                setTotalIncome(totalAmount)
                }
            )
            .catch(error => console.log(error));

            axios.post("http://localhost:8000/api/transactions/period",{
                userId: userId,
                date: {$gte: new Date(beginningOfThisYear), $lt: new Date(beginningOfNextYear)},
                type: "expense",
            }, {withCredentials: true})
                .then(res => {
                    let response = res.data
                    let array = [0]
                    response.map(el=>array.push(el.amount))
                    let totalAmount = array.reduce((a,b)=>a+b)
                    setTotalExpenses(totalAmount)
                    }
                )
                .catch(error => console.log(error));
    }, [userId]);

    useEffect(() => {
        setPercentages();
    }, [totalIncome,totalExpenses]);

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

    const setPercentages = () =>{
        if(totalIncome!==0){
            let incomeP = Math.round((totalIncome-totalExpenses)/totalIncome*100)
            setIncomePercentage(incomeP)
            console.log(incomePercentage)
        }else{
            setIncomePercentage(0)
        }
        if(totalExpenses!==0){
            let expensesP = Math.round((totalIncome-totalExpenses)/totalExpenses*100)
            setExpensePercentage(expensesP)
        }else{
            setExpensePercentage(0)
        }
    }

    const handleDateYearly = () =>{
        // e.preventDefault()
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
        setPercentages();
    }

    const handleDateMonthly = () =>{
        // e.preventDefault()
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
        setPercentages();
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

    const handleDateWeekly = () =>{
        // e.preventDefault()
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
        setPercentages();
    }

    const handleDateDaily = () =>{
        // e.preventDefault()
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
        setPercentages();
    }

    let expensesPercentageCircleStyles = {
        "--percentage":90,
        "--color":"orange",
    }

    let incomePercentageCircleStyles = {
        "--percentage":62,
        "--color":"orange",
    }

    return (
        <div className={styles.stadistics}>
            <div className={styles.stadistics__label}>
                <h2 className={styles.stadistics__title}>Stadistics</h2>
                <Dropdown 
                    actions={[handleDateYearly, handleDateMonthly, handleDateWeekly, handleDateDaily]}
                    options={["This Year","This Month","This Week","Today"]}>
                </Dropdown>
            </div> 
            
            <div className={styles.stadistics__container}>
                <div className={styles.stadistics__card}>
                    <div className={styles.stadistics__description}>
                        <h4>My Balance</h4>
                        <p>${totalIncome-totalExpenses}</p> 
                    </div>
                </div>
                <div className={styles.stadistics__card}>
                    <div className={styles.stadistics__description}>
                        <h4>Total Expenses</h4>
                        <p>${totalExpenses}</p>
                    </div>
                    <div class={`${styles.pie} ${styles.animate}`} style={expensesPercentageCircleStyles}>{expensePercentage+"%"}</div>
                </div>
                <div className={styles.stadistics__card}>
                    <div className={styles.stadistics__description}>
                        <h4>Total Income</h4>
                        <p>${totalIncome}</p>
                    </div>
                    <div class={`${styles.pie} ${styles.animate}`} style={incomePercentageCircleStyles}>{incomePercentage+"%"}</div>
                </div>
            </div>

        </div>
    )
}

export default StadisticsSection;