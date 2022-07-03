const Transaction = require("../models/transaction.model");

module.exports.sortTransactionsByPeriodForChart = async(request) => { 
    //Request->userId,startDate,endDate,period
    console.log(request.startDate)
    const requestBuilt = {
      userId: request.userId,
      date: {$gte: new Date(request.startDate), $lt: new Date(request.endDate)},
    }
    const responseIncome = await Transaction.find({ ...requestBuilt, type: "income" },{_id: 0, userId: 0, type:0, title:0, description:0, category:0, createdAt:0, updatedAt:0 })

    const responseExpenses = await Transaction.find({ ...requestBuilt, type: "expense" },{_id: 0, userId: 0, type:0, title:0, description:0, category:0, createdAt:0, updatedAt:0 })

    if (request.period === "THISYEAR") {
        return sortAmount(months, responseIncome, responseExpenses)
    }else if(request.period === "THISMONTH"){
      return sortAmount(days, responseIncome, responseExpenses)
    }else if(request.period === "THISWEEK"){
      return sortAmount(weekDays, responseIncome, responseExpenses)
    }
}


//Variables
let thisYear = new Date().getFullYear()
let thisMonth = new Date().getMonth()+1;

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

let numberOfDaysThisMonth =new Date(thisYear, thisMonth, 0).getDate()

const getNextMonthnumber = () =>{
    let nextMonthNumber = new Date().getMonth()+2;
    if(nextMonthNumber===13){
        nextMonthNumber = 1
    }
    return nextMonthNumber
}

let nextMonthNumber = getNextMonthnumber();

const getMonthDays = () =>{
     const days = []
     for(i=1;i<=numberOfDaysThisMonth;i++){
      if(i==numberOfDaysThisMonth){
        days.push({month: i, startDate: `${thisYear}-${thisMonth}-${i}`, endDate: `${thisYear}-${nextMonthNumber}-01`})
      }else if(12==numberOfDaysThisMonth){
        days[days.length-1].endDate = `${thisYear+1}-01-01`   
      }else{
        days.push({month: i, startDate: `${thisYear}-${thisMonth}-${i}`, endDate: `${thisYear}-${thisMonth}-${i+1}`})
      }
      
    }
    return days
};  
let days = getMonthDays();

const getMonday = (d) => {
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1);
  const newDate = new Date(d.setDate(diff));
  return newDate
}

const addDays =(date, days) => {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  let u = copy.toISOString().split('T')[0]
  return u
}

const thisMonday = getMonday(new Date())

const weekDays = [
  {month: "Mon", startDate: `${addDays(thisMonday,0)}`, endDate: `${addDays(thisMonday,1)}`},
  {month: "Tue", startDate: `${addDays(thisMonday,1)}`, endDate: `${addDays(thisMonday,2)}`},
  {month: "Wed", startDate: `${addDays(thisMonday,2)}`, endDate: `${addDays(thisMonday,3)}`},
  {month: "Thr", startDate: `${addDays(thisMonday,3)}`, endDate: `${addDays(thisMonday,4)}`},
  {month: "Fri", startDate: `${addDays(thisMonday,4)}`, endDate: `${addDays(thisMonday,5)}`},
  {month: "Sat", startDate: `${addDays(thisMonday,5)}`, endDate: `${addDays(thisMonday,6)}`},
  {month: "Sun", startDate: `${addDays(thisMonday,6)}`, endDate: `${addDays(thisMonday,7)}`},
]


//Main Function
const sortAmount = (template, income, expenses) => {
    const incomesAndExpenses = [];
    for (const t of template) {
      const { month, startDate, endDate } = t;
      const response = { milestone: month, Income: 0, Expenses: 0 };
      income.forEach(income => {
        const date = income.date;
        if (date >= new Date(startDate) && date < new Date(endDate)) {
          response.Income += income.amount;
        }
      });
  
      expenses.forEach(expense => {
        const date = expense.date;
        if (date >= new Date(startDate) && date < new Date(endDate)) {
          response.Expenses += expense.amount;
        }
      });
  
      incomesAndExpenses.push(response);
    }
  
    return incomesAndExpenses;
}
