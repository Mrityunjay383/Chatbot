import React from 'react'

function MultiSelect({optionArr, selecteMultiChoice}) {
  return (
    <div className="multiSelectCon">
      {optionArr.map((option, index) => {
        return <span>
          <input type="checkbox" name={option} value={option} />
          <label for={option}>{option}</label>
        </span>
      })}
      <button onClick={selecteMultiChoice}>Done</button>
    </div>
  )
}

export default MultiSelect;
