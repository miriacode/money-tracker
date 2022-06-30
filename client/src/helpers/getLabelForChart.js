//ARRAYLABEL

//Yearly
export const arrayMonthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

//Montly
const numOfDays = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()
export const arrayDaysLabels = []
for(let i=0;i<numOfDays;i++){
    arrayDaysLabels.push(i+1)
}

//Weekly
export const arrayWeekLabels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

//Daily
export const arrayHourLabels = ['12:00 am','','','','','','6:00 am','','','','','','12:00 pm','','','','','','6:00 pm','','','','','']