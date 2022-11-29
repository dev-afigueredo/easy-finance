import React from 'react'

export default function ButtonDown({ statusButtonDown, onClickButtonDown }) {
  return (
    <div className="input-field col s3" style={{ position: 'sticky' }}>
      <button className="btn waves-effect waves-light" name="<"
        {...statusButtonDown.toString()} onClick={onClickButtonDown}>
        <i className="material-icons right">chevron_left</i>
      </button>
    </div>
  )
}
