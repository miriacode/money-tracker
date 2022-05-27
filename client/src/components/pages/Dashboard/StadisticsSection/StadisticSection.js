import React, {useEffect, useState} from "react";
import axios from "axios";

const StadisticsSection = ({userId}) => {

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [dateFilter,setDateFilter] = useState("yearly");
    
    // const [type, setType] = useState("expense");

    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/"+userId,{withCredentials: true})
            .then(res => {
                // setTotalIncome(res.data)
                // console.log(categoryList)
                console.log(res.data)
                console.log(res.data.transactions)

                //Transactions
                let transactionsList = res.data.transactions
                
                //Income
                let incomeList = transactionsList.filter(transaction=>transaction.type==="income")
                let incomeAmount = incomeList.map(transaction=>transaction.amount)
                let totalIncome_ = incomeAmount.reduce((a,b)=>a+b)
                setTotalIncome(totalIncome_)

                //Expenses
                let expensesList = transactionsList.filter(transaction=>transaction.type==="expense")
                let expensesAmount = expensesList.map(transaction=>transaction.amount)
                let totalExpenses_ = expensesAmount.reduce((a,b)=>a+b)
                setTotalExpenses(totalExpenses_)
                
            })
            .catch(error => console.log(error));
    }, [userId])

    const handleDateFilter = (e) =>{
        setDateFilter(e.target.value);
    }

    return (
        <div>
            <h2>Stadistics Section</h2>
            {/* <p>%buttons%</p> */}
            <div>
                <label>
                    Y<input type="radio" name="date-filter-stadistic-section" value="yearly" onChange={handleDateFilter} defaultChecked/>
                </label>
                <label>
                    M<input type="radio" name="date-filter-stadistic-section" value="monthly" onChange={handleDateFilter}/>
                </label>
                <label>
                    W<input type="radio" name="date-filter-stadistic-section" value="weekly" onChange={handleDateFilter}/>
                </label>
                <label>
                    D<input type="radio" name="date-filter-stadistic-section" value="daily" onChange={handleDateFilter}/>
                </label>
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