import React, {useState, useEffect} from 'react';
import axios from "axios";

function Chatbot({baseURL}) {

    const [currIndex, setCurrIndex] = useState(1);
    const [currQuestion, setCurrQuestion] = useState({});

    const getActualData = (input) => {
      return input.replace("<vajra-p>", "").replace("</vajra-p>", "");
    }

    const getResponce = async () => {

      await axios.post(`${baseURL}/chatbot`, {currIndex}, {validateStatus: false, withCredentials: true}).then((response) => {
        if(response.status === 200){
          setCurrQuestion(() => {
            populateMessage();
            return response.data.q;
          });

        }else{
        }
      });

    }

    const populateMessage = () => {
      console.log(currQuestion);
      const chatbot = document.querySelector('.chatbot'); // selecting the status class
      chatbot.innerHTML = `${currQuestion.textContext}`;
    }

    useEffect(() => {
      getResponce();
    }, [])

    return (
        <div className="chatbot">

        </div>
    )
}

export default Chatbot;
