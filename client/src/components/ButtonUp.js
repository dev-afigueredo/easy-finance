import React from 'react'

export default function ButtonUp({ statusButtonUp, onClickButtomUp }) {
  return (
    <div className="input-field col s3" style={{ position: 'sticky' }}>
      <button className="btn waves-effect waves-light" name=">"
        {...statusButtonUp.toString()} onClick={onClickButtomUp}>
        <i className="material-icons right">chevron_right</i>
      </button>
    </div>
  )
}

