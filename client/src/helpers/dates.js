//Functions
const getNextMonthnumber = () =>{
    let nextMonthNumber = new Date().getMonth()+2;
    if(nextMonthNumber===13){
        nextMonthNumber = 1
    }
    return nextMonthNumber
}

const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    const newDate = new Date(d.setDate(diff));
    return newDate
}

const t = getMonday(new Date()); 

const getNextMonday = () => {
    const d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + 1) % 7);
    return d
}

const n = getNextMonday(); 


//Exported Variables
export const thisYear = new Date().getFullYear();

export const thisMonth = new Date().getMonth()+1;

export const nextMonth = getNextMonthnumber();

export const thisMonday = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;

export const nextMonday = `${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`;

