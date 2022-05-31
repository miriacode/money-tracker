import React from "react";
import { Link } from "react-router-dom";

const TransactionRow = ({transaction, deleteTransaction}) => {
  let { _id, type, title, amount, category, date } = transaction;

  let newDate = new Date(date).toUTCString().split(" ")
  date = `${newDate[2]} ${newDate[1]}, ${newDate[3]}`

  return (
    <tr>
      <td>{type}</td>
      <td>{title}</td>
      <td>$ {amount}</td>
      <td>{category}</td>
      <td>{date}</td>
      <td>
        {/* <button onClick={viewTransaction()>View</button> */}
        <Link to={"/transactions/"+_id}>View</Link>
        <button onClick={() => deleteTransaction(_id)}>Delete</button>
     </td>
    </tr>
  );
};

export default TransactionRow;
