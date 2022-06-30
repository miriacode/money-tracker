//ARRAY INCOME & EXPENSES
//Yearly
export const arrayMonthStartDate =[]
export const arrayMonthEndDate =[]
const a = ["01","02","03","04","05","06","07","08","09",10,11,12]
for(let i =0;i<a.length;i++){
    arrayMonthStartDate.push(`${new Date().getFullYear()}-${a[i]}-01`)
    arrayMonthEndDate.push(`${new Date().getFullYear()}-${a[i]}-${new Date(new Date().getFullYear(), i+1, 0).getDate()}`)
}

console.log(arrayMonthStartDate)
console.log(arrayMonthEndDate)