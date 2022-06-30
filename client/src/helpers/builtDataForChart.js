export default builtDataForChart = (arrayLabels, arrayIncome, arrayExpenses) =>{
    let newData = []
    for(let i=0; i<arrayLabels.length; i++){
        newData.push({milestone:arrayLabels[i], Income:arrayIncome[i], Expenses:arrayExpenses[i]})
    }
    return newData
}