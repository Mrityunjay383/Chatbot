import React, {useState} from 'react';

import ChatIcon from "./components/ChatIcon";
import ChatWindow from "./components/ChatWindow";

import Data from "./sampledata.json";


function App() {

  const [isActive, setIsActive] = useState(false);

  const changeState = () => {
    setIsActive((curr) => {
      return (!curr);
    })
  }

  return (
    <div className="App">
      <ChatIcon isActive={isActive} color1={Data.config.botColor} color2={Data.config.botColor2} changeState={changeState} />

      <ChatWindow isActive={isActive} config={Data.config} questions={Data.questions} />

    </div>
  );
}

export default App;
