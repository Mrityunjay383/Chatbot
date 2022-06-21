import React, {useState, useEffect} from 'react';
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./botComponents/Message";
import Opbtn from "./botComponents/Opbtn";
import MultiSelect from "./botComponents/MultiSelect";
import Question from "./botComponents/Question";

function Chatbot({baseURL, setIsChatCompleted, setResArr}) {

    const [currIndex, setCurrIndex] = useState(0);
    const [currQuestion, setCurrQuestion] = useState({id: "1",textContent: "", title: "Message"});
    const [renderedEle, setRenderEle] = useState([]);


    const getActualData = (input) => {
      return input.replace("<vajra-p>", "").replace("</vajra-p>", "").replace("<em>", "").replace("</em>", "");
    }

    //Handling input from the MultiChoice
    const userResponce = (e) => {
      const conditionValue = currQuestion.conditions[e.target.value];

      setResArr((curr) => {
        return [...curr, {
          title: getActualData(currQuestion.textContent),
          response: e.target.value
        }]
      })

      if(conditionValue === "next"){


        e.target.classList.add("opBtnAfter");

        e.currentTarget.innerHTML = '';
        e.currentTarget.appendChild(e.target);


        setCurrIndex(currIndex + 1);
      }
    }

    //Handling Input from the Question
    const nextAfterQuestion = (e) => {
      const parentCon = e.target.parentElement;
      const value = parentCon.firstChild.value;

      setResArr((curr) => {
        return [...curr, {
          title: getActualData(currQuestion.textContent),
          response: value
        }]
      })

      parentCon.classList.add("queAfter")
      parentCon.innerHTML = `<span>${value}</span>`;


      setCurrIndex(currIndex + 1);
    }

    //Handling Input for MultiSelect
    const selecteMultiChoice = (e) => {
      const selectedChoices = [];
      let selectedChoicesString = "";
      const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

      if(checkboxes.length > 0){
        for (let i = 0; i < checkboxes.length; i++) {
          selectedChoices.push(checkboxes[i].value);

          i + 1 == checkboxes.length ? selectedChoicesString += `${checkboxes[i].value}` : selectedChoicesString += `${checkboxes[i].value}, `;
        }

        setResArr((curr) => {
          return [...curr, {
            title: getActualData(currQuestion.textContent),
            response: selectedChoicesString
          }]
        })

        const parentCon = e.target.parentElement;
        parentCon.classList.remove("multiSelectCon");
        parentCon.classList.add("queAfter");

        let toBePlacedHTML = ``;
        selectedChoices.map((selectedOption) => {
          return toBePlacedHTML += `<span>${selectedOption}</span>`
        })
        parentCon.innerHTML = toBePlacedHTML;


        setCurrIndex(currIndex + 1);
      }
    }


    //Function responsible for getting the question from backend server
    const getResponce = async () => {
      if(currIndex === 0){
        console.log("init");
      }else{
        await axios.post(`${baseURL}/chatbot`, {currIndex}, {validateStatus: false, withCredentials: true}).then((response) => {
          if(response.status === 200){
            setCurrQuestion(response.data.q);
          }else{
            setTimeout(() => {
              setIsChatCompleted(true);
            }, 2500);
            console.log("Done");
          }
        });
      }
    }


    //Function responsible for handling perticular question from backend
    const populateMessage = () => {

      setRenderEle((curr) => {
        return [...curr, <Message key={currQuestion.id} value={currQuestion.textContent} getActualData={getActualData}/>]
      });

      if(currQuestion.title === "Message"){

        setCurrIndex(currIndex + 1);

      }else if(currQuestion.title === "Multi Choice"){

        setRenderEle((curr) => {
          return [...curr, <Opbtn key={currQuestion.id} btnArr={currQuestion.options} userResponce={userResponce} />]
        });

      }else if(currQuestion.title === "Question" || currQuestion.title === "Name"){

        setRenderEle((curr) => {
          return [...curr, <Question key={currQuestion.id} inputType="text" inputPattern="" nextAfterQuestion={nextAfterQuestion}/>]
        });

      }else if(currQuestion.title === "Phone"){

        setRenderEle((curr) => {
          return [...curr, <Question key={currQuestion.id} inputType="number" nextAfterQuestion={nextAfterQuestion}/>]
        });

      }else if(currQuestion.title === "Multi Select"){

        setRenderEle((curr) => {
          return [...curr, <MultiSelect key={currQuestion.id} optionArr={currQuestion.options} selecteMultiChoice={selecteMultiChoice}/>]
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

            curr.pop();//removing typing element after fixed time

            return [...curr]
          });
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
