import React from 'react'

function Message({value, getActualData}) {
  return <span className="message">{getActualData(value)}</span>
}

export default Message;
