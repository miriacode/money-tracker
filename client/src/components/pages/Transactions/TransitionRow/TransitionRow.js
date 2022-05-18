import React from "react";
// import axios from "axios";

// import React from "react";


const TransactionRow = ({transaction, deleteTransaction}) => {
  let { _id, type, title, amount, category } = transaction;

//   const [transactionObject, setTransactionObject] = useState("");
  const viewTransaction = () => {
    // () => setTransactionToView(transaction)
    //REDIRIGIR A VIEW ONE TRANSACTION
    //CORREGIR EN APP EL ID DE TRANSACTION 1
  }

  return (
    <tr>
      <td>{type}</td>
      <td>{title}</td>
      <td>$ {amount}</td>
      <td>{category}</td>
      <td>
        <button onClick={viewTransaction()}>View</button>
        <button onClick={() => deleteTransaction(_id)}>Delete</button>
     </td>
      {/* <td>
        
      </td> */}
    </tr>
  );
};

export default TransactionRow;
