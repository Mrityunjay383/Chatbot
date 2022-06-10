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
        {isActive ? (
            <AnimatedChatWindow baseURL={baseURL} chatGoingOn={chatGoingOn} changeChatState={changeChatState} config={config}/>
          ) : (<p></p>)
        }
      </div>

    )
}

export default ChatWindow;
