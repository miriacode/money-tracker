// import React, {useEffect, useState} from "react";
// import axios from "axios";

import React from "react";


const TransactionRow = ({transaction}) => {
  let { type, title, amount, category } = transaction;

  return (
    <tr>
      <td>{type}</td>
      <td>{title}</td>
      <td>$ {amount}</td>
      <td>{category}</td>
      <td>Actions</td>
      {/* <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td> */}
    </tr>
  );
};

export default TransactionRow;
