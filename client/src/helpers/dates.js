
export const thisYear = new Date().getFullYear();

export const thisMonth = new Date().getMonth()+1;




const getNextMonthnumber = () =>{
    let nextMonthNumber = new Date().getMonth()+2;
    if(nextMonthNumber===13){
        nextMonthNumber = 1
    }
    return nextMonthNumber
}
export const nextMonth = getNextMonthnumber();