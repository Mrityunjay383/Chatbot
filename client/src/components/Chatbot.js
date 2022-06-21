import React, {useState, useEffect} from 'react';
import { renderToString } from "react-dom/server"
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";


function Chatbot({baseURL, serIsChatCompleted}) {

    const [currIndex, setCurrIndex] = useState(0);
    const [currQuestion, setCurrQuestion] = useState({id: "1",textContent: "", title: "Message"});
    const [renderedEle, setRenderEle] = useState([]);


    const getActualData = (input) => {
      return input.replace("<vajra-p>", "").replace("</vajra-p>", "").replace("<em>", "").replace("</em>", "");
    }


    const userResponce = (e) => {
      const conditionValue = currQuestion.conditions[e.target.value];
      if(conditionValue === "next"){


        e.target.classList.add("opBtnAfter");

        e.currentTarget.innerHTML = '';
        e.currentTarget.appendChild(e.target);


        setCurrIndex(currIndex + 1);
      }
    }

    const nextAfterQuestion = (e) => {
      const parentCon = e.target.parentElement;
      const value = parentCon.firstChild.value;
      parentCon.classList.add("queAfter")
      parentCon.innerHTML = `<span>${value}</span>`;


      setCurrIndex(currIndex + 1);
    }

    const selecteMultiChoice = (e) => {
      var array = []
      var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

      for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
      }

      const parentCon = e.target.parentElement;
      parentCon.classList.remove("multiSelectCon");
      parentCon.classList.add("queAfter");

      let toBePlacedHTML = ``;
      array.map((selectedOption) => {
        toBePlacedHTML += `<span>${selectedOption}</span>`
      })
      parentCon.innerHTML = toBePlacedHTML;


      setCurrIndex(currIndex + 1);
    }

    const getResponce = async () => {
      if(currIndex === 0){
        console.log("init");
      }else{
        await axios.post(`${baseURL}/chatbot`, {currIndex}, {validateStatus: false, withCredentials: true}).then((response) => {
          if(response.status === 200){
            setCurrQuestion(response.data.q);
          }else{
            setTimeout(() => {
              serIsChatCompleted(true);
            }, 2500);
            console.log("Done");
          }
        });
      }
    }

    const Message = ({value}) => {
      return <span className="message">{getActualData(value)}</span>
    }
    const Opbtn = ({btnArr}) => {
      return (
        <div className="opBtnCon" onClick={userResponce}>
          {btnArr.map((btn, index) => {
            return <button key={index} className="opBtnBefore" value={`${index}: ${btn}`}>{btn}</button>
          })}
        </div>
      )

    }

    const MultiSelect = ({optionArr}) => {
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

    const Question = ({inputType}) => {
      let placeholder;
      if(inputType == "number"){
        placeholder = "917838081663";
      }else{
        placeholder = "Type input..."
      }

      return (
        <div className="queCon">
          <input type={inputType} placeholder={placeholder} onKeyPress={(event) => {
            if(event.key === "Enter"){
              var phoneno = /^\d{12}$/;
              if(inputType == "number"){
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

    const populateMessage = () => {

      setRenderEle((curr) => {
        return [...curr, <Message key={currQuestion.id} value={currQuestion.textContent}/>]
      });

      if(currQuestion.title === "Message"){

        setCurrIndex(currIndex + 1);

      }else if(currQuestion.title === "Multi Choice"){

        setRenderEle((curr) => {
          return [...curr, <Opbtn key={currQuestion.id} btnArr={currQuestion.options} />]
        });

      }else if(currQuestion.title === "Question" || currQuestion.title === "Name"){

        setRenderEle((curr) => {
          return [...curr, <Question key={currQuestion.id} inputType="text" inputPattern="" />]
        });

      }else if(currQuestion.title === "Phone"){

        setRenderEle((curr) => {
          return [...curr, <Question key={currQuestion.id} inputType="number" />]
        });

      }else if(currQuestion.title === "Multi Select"){

        setRenderEle((curr) => {
          return [...curr, <MultiSelect key={currQuestion.id} optionArr={currQuestion.options} />]
        });

      }

    }

    useEffect(() => {
      getResponce()
    }, [currIndex]);

    useEffect(() => {
      if(currQuestion.id != 1){
        setRenderEle((curr) => {
          return [...curr, <span className="hold">typing...</span>]
        });

        setTimeout(() => {
          setRenderEle((curr) => {

            console.log(curr.pop());

            return [...curr]
          });
          console.log("Current Array", renderedEle);
        }, 1300);
        setTimeout(populateMessage, 1400);
      }else{
        setCurrIndex(currIndex +1)
      }
    }, [currQuestion]);

    return (
      <ScrollToBottom className="chatbot">
        {renderedEle.map((ele, index) => {
          return ele;
        })}
      </ScrollToBottom>

    )
}

export default Chatbot;
