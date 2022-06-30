let arrayIncome=[]
        let arrayExpenses=[]

        for(let i=0;i<arrayMonthStartDate.length;i++){
            axios.post("http://localhost:8000/api/transactions/period",{
                userId: userId,
                date: {$gte: new Date(arrayMonthStartDate[i]), $lt: new Date(arrayMonthEndDate[i])},
                type: "income",
            }, {withCredentials: true})
                .then(res => {
                    console.log(res.data)
                    
                    if(res.data==""){
                        arrayIncome.push(0)
                        console.log(arrayIncome)
                    }else{
                        let sum = []
                        res.data.forEach(el=>sum.push(el.amount))
                        let suma = sum.reduce((a,b)=>(a+b))
                        arrayIncome.push(suma)
                        //console.log(sum)
                        console.log(arrayIncome)
                    }
                   
                })
                .catch(error => console.log(error));    
        }
        
        // console.log(arrayIncome)
