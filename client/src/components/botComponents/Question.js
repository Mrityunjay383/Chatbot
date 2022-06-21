import React from 'react'

function Question({inputType, nextAfterQuestion}) {
  let placeholder;
  if(inputType === "number"){
    placeholder = "917838081663";
  }else{
    placeholder = "Type input..."
  }

  return (
    <div className="queCon">
      <input type={inputType} placeholder={placeholder} onKeyPress={(event) => {
        if(event.key === "Enter"){
          var phoneno = /^\d{12}$/;
          if(inputType === "number"){
              if(event.target.value.match(phoneno)){
                nextAfterQuestion(event);
              }
          }else{
            nextAfterQuestion(event);
          }
        }
      }} />
    </div>
  )
}

export default Question;
