//const TransactionController = require("../controllers/transaction.controller");//hacer un nuevo q me retorne un amount y date de todas

const Transaction = require("../models/transaction.model");

module.exports.sortTransactionsByPeriodForChart = async(request) => { 
    //Request->userId,startDate,endDate,perid
    //ejm: 1/2022-01-01/2022-12-31/THIS YEAR
    const requestBuilt = {
      userId: request.userId,
      date: {$gte: new Date(request.startDate), $lt: new Date(request.endDate)},
    }
    const responseIncome = await Transaction.find({ ...requestBuilt, type: "income" },{_id: 0, userId: 0, type:0, title:0, description:0, category:0, createdAt:0, updatedAt:0 })
    console.log(responseIncome)

    const responseExpenses = await Transaction.find({ ...requestBuilt, type: "expense" },{_id: 0, userId: 0, type:0, title:0, description:0, category:0, createdAt:0, updatedAt:0 })
    console.log(responseExpenses)

    if (request.period === "THISYEAR") {
        return sortThisYear(responseIncome, responseExpenses)//Jan,Feb
    }

    // if (request.period === "THISMONTH") {
    //     return sortThisMonth(incomes, expenses)
    // }
    // if (request.period === "THISWEEK") {
    //     return sortWeekly(incomes, expenses)//this
    // }
    // if (request.period === "THISDAY") {
    //     return sortDaily(incomes, expenses)
    // };
  }
        

    
   
    
    
    

  const sortThisYear = (income, expenses) => {//todos los incomes y esxpenses de este amo
    let thisYear = new Date().getFullYear()
    const months = [
      {month: "Jan", startDate: `${thisYear}-01-01`, endDate: `${thisYear}-01-31`},
      {month: "Feb", startDate: `${thisYear}-02-01`, endDate: `${thisYear}-02-28`},
      {month: "Mar", startDate: `${thisYear}-03-01`, endDate: `${thisYear}-03-31`},
      {month: "Apr", startDate: `${thisYear}-04-01`, endDate: `${thisYear}-04-30`},
      {month: "May", startDate: `${thisYear}-05-01`, endDate: `${thisYear}-05-31`},
      {month: "Jun", startDate: `${thisYear}-06-01`, endDate: `${thisYear}-06-30`},
      {month: "Jul", startDate: `${thisYear}-07-01`, endDate: `${thisYear}-07-31`},
      {month: "Aug", startDate: `${thisYear}-08-01`, endDate: `${thisYear}-08-31`},
      {month: "Sep", startDate: `${thisYear}-09-01`, endDate: `${thisYear}-09-30`},
      {month: "Oct", startDate: `${thisYear}-10-01`, endDate: `${thisYear}-10-31`},
      {month: "Nov", startDate: `${thisYear}-11-01`, endDate: `${thisYear}-11-30`},
      {month: "Dic", startDate: `${thisYear}-12-01`, endDate: `${thisYear}-12-31`},
    ];
    const incomesAndExpensesThisYear = [];
    for (const m of months) {
      const { month, startDate, endDate } = m;
      const response = { milestone: month, Income: 0, Expenses: 0 };
      income.forEach(income => {
        const date = income.date;
        if (date > new Date(startDate) && date < new Date(endDate)) {
          response.Income += income.amount;
        }
      });
  
      expenses.forEach(expense => {
        const date = expense.date;
        if (date > new Date(startDate) && date < new Date(endDate)) {
          response.Expenses += expense.amount;
        }
      });
  
      incomesAndExpensesThisYear.push(response);
    }
  
    return incomesAndExpensesThisYear;
}


// module.exports.sortTransactionsByPeriodForChart();
  