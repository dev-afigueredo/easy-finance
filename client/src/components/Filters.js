import React from 'react';


export default function Filters({ onChanceFilter }) {
  const handleFilter = (event) => {
    const filterInserted = event.target.value;
    onChanceFilter(filterInserted);
  }
  return (
    <div className="input-field col" style={{ width: "78%" }}>
      <input placeholder="Filtro" id="inputFilter" type="text" onChange={handleFilter} autoFocus />
    </div>
  )
}


