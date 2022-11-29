import React from 'react'

export default function ButtonAdd({ onAdd }) {
  const onClickAdd = () => {
    onAdd();
  }
  return (
    <div className="input-field col" style={{ width: "22%", position: 'sticky' }}>
      <button className="waves-effect waves-light btn-small" onClick={onClickAdd}>+ NOVO LANÇAMENTO</button>
    </div>
  )
}

