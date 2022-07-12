import React from 'react'

function Opbtn({btnArr, userResponce}) {
  return (
    <div className="opBtnCon" onClick={userResponce}>
      {btnArr.map((btn, index) => {
        return <button key={index} className="opBtnBefore" value={`${index}: ${btn}`}>{btn}</button>
      })}
    </div>
  )
}

export default Opbtn;
