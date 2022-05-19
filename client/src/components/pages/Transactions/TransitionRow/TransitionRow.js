import React from "react";
// import axios from "axios";

// import React from "react";
import { Link } from "react-router-dom";



const TransactionRow = ({transaction, deleteTransaction}) => {
  let { _id, type, title, amount, category } = transaction;



  return (
    <tr>
      <td>{type}</td>
      <td>{title}</td>
      <td>$ {amount}</td>
      <td>{category}</td>
      <td>
        {/* <button onClick={viewTransaction()>View</button> */}
        <Link to={"/transaction/"+_id}>View</Link>
        <button onClick={() => deleteTransaction(_id)}>Delete</button>
     </td>
      {/* <td>
        
      </td> */}
    </tr>
  );
};

export default TransactionRow;
