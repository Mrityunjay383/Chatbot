import React, {useState, useEffect} from 'react';
import axios from "axios";

import ChatIcon from "./components/ChatIcon";
import ChatWindow from "./components/ChatWindow";

const baseURL = "http://localhost:3001";

function App() {

  const [isActive, setIsActive] = useState(false);
  const [configdata, setConfigData] = useState({});

  const getData = async () => {
    await axios.get(`${baseURL}`, { validateStatus: false, withCredentials: true }).then((response) => {
      setConfigData(response.data.config);
    });
  }

  const changeState = () => {
    setIsActive((curr) => {
      return (!curr);
    })
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      setIsActive(true)
    }, 5000)
  }, [])

  return (
    <div className="App">
      <ChatIcon isActive={isActive} color1={configdata.botColor} color2={configdata.botColor2} changeState={changeState} />

      <ChatWindow baseURL={baseURL} isActive={isActive} config={configdata} />

    </div>
  );
}

export default App;
