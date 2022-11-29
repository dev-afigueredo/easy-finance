import React from 'react';
import TransactionService from '../services/TransactionService';

export default function Actions({ onDelete, onEdit, idTransaction }) {
  const onClickDelete = () => {
    onDelete(idTransaction);
  }

  const onClickEdit = () => {
    TransactionService.getTransaction(idTransaction).then((response) => {
      onEdit(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <div style={{ marginTop: "25px" }} className="input-field col s3">
        <button className="btn-flat" onClick={onClickEdit}>
          <i style={{ marginRight: "-10px" }} className="material-icons 1px">edit</i>
        </button>
        <button className="btn-flat" onClick={onClickDelete}>
          <i className="material-icons 1px">delete</i>
        </button>
      </div>
    </>
  )
}
