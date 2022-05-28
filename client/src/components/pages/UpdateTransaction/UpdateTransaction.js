import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

const UpdateTransaction = ({userId}) => {
    
    const {id} = useParams();

    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const [categoryList, setCategoryList] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/transactions/"+id,{withCredentials: true})
            .then(res => {
                setType(res.data.type);
                setCategory(res.data.category);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setAmount(res.data.amount)
                let date = new Date("2022-05-24T00:00:00.000Z").toUTCString().split(" ")
                let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
                let monthNumber = 0
                monthArray.forEach((m,i)=>(m===date[2])?monthNumber=i+1:null)
                if(monthNumber<10){
                    monthNumber="0"+monthNumber;
                }
                setDate(`${date[3]}-${monthNumber}-${date[1]}`)
                console.log(date)
            })
            .catch(error => console.log(error));
    }, [id])
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/categories/find/"+userId,{withCredentials: true})
            .then(res => {
                setCategoryList(res.data);
            })
            .catch(error => console.log(error));
    }, [userId]);

    const updateTransaction = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/transactions/"+id,{
            type,
            category,
            title,
            description,
            amount,
            date
        },{withCredentials: true})
            .then(res => navigate("/transactions/"+id))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div>
            <h2>Update Transaction</h2>
            <div>
            <form onSubmit={updateTransaction}>
                <div className="form-check">
                    <label>
                    Type:
                        <select value={type} onChange={(e)=>setType(e.target.value)}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                    {errors.title? <span className="text-danger">{errors.title.message}</span> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                    {errors.description ? <span className="text-danger">{errors.description.message}</span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    $<input type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" />
                    {errors.amount ? <span className="text-danger">{errors.amount.message}</span> : null}
                </div>
                
                <div className="form-check">
                    <label>
                    Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>-----</option>
                            {type==="expense"?categoryList.filter(category=>category.type==="expense").map((category,index)=>(
                                <option key={index} value={category.categoryName}>{category.categoryName}</option>
                            )):categoryList.filter(category=>category.type==="income").map((category,index)=>(
                                <option key={index} value={category.categoryName}>{category.categoryName}</option>
                            ))
                           }
                        </select>
                    </label>
                    {errors.category ? <span className="text-danger">{errors.category.message}</span> : null}

                </div>
                <div className="form-check">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    {errors.date ? <span className="text-danger">{errors.date.message}</span> : null}
                </div>

                <input type="submit" value="Update" className="btn btn-success" />
            </form>
            </div>
            
        </div>
    )
}

export default UpdateTransaction;