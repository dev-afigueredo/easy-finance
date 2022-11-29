import React from 'react';
import { formatNumber } from '../helpers/formatterHelper';

export default function Totalizers({ totalLanc, revenue, expenses, balance }) {
  const colorBalance = balance < 0 ? "red" : "green";
  return (
    <div className="row" style={{ fontWeight: "bold", borderRadius: "10px", borderStyle: "solid" }}>
      <div className="input-field col s3">
        <span>Lançamento: {totalLanc}</span>
      </div>
      <div className="input-field col s3">
        <span>Receitas:
          <span style={{ color: "green" }}>{formatNumber(revenue)}</span
          ></span>
      </div>
      <div className="input-field col s3">
        <span>Despesas:
          <span style={{ color: "green" }}>{formatNumber(expenses)}</span>
        </span>
      </div>
      <div className="input-field col s3">
        <span>Saldo:
          <span style={{ color: colorBalance }}>{formatNumber(balance)}</span>
        </span>
      </div>
    </div >
  )
}
