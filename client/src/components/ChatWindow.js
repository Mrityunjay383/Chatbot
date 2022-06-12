import React, {useState} from 'react';

import '../App.css';

import AnimatedChatWindow from "./AnimatedChatWindow";

function ChatWindow({isActive, config, baseURL}) {

    const [chatGoingOn, setChatGoingOn] = useState(false);

    const changeChatState = () => {
      setChatGoingOn(true);
    }

    return (
      <div>

        <AnimatedChatWindow isActive={isActive} baseURL={baseURL} chatGoingOn={chatGoingOn} changeChatState={changeChatState} config={config}/>

      </div>

    )
}

export default ChatWindow;
