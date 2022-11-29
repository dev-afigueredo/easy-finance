import React from 'react';
import { dataFormatterMonthYear } from '../helpers/dateHelper';

export default function SelectDates({ dataList, dataSelectedId, onChangeSelect }) {

  const handleChangeSelect = (event) => {
    const newDataId = event.target.value;
    onChangeSelect(newDataId);
  }

  return (
    <div className="input-field col s5">
      <select className="browser-default" value={dataSelectedId} onChange={handleChangeSelect}>
        {
          dataList.map((item, index) => {
            return (
              <option key={index} value={index}>
                {dataFormatterMonthYear(item._id)}
              </option>
            );
          })}
      </select>
    </div>
  )
}
