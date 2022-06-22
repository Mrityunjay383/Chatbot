import React, {useState, useEffect} from 'react';
import axios from "axios";
import { animated, useSpring } from 'react-spring'

import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { db, storage } from "../firebase";
import Cookies from 'js-cookie';

import Chatbot from "./Chatbot";
import WhatsappIcon from "./WhatsappIcon";

function AnimatedChatWindow({config, changeChatState, chatGoingOn, baseURL, isActive}) {


    const [isChatCompleted, setIsChatCompleted] = useState(false);
    const [resArr, setResArr] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    const sendMail = async () => {
      await axios.post(`${baseURL}/sendMail`, {userEmail, resArr, uid: Cookies.get('uid')}, {validateStatus: false, withCredentials: true}).then((response) => {
        if(response.status === 200){
          console.log(response);
        }else{
          console.log(response);
      }});
    }

    const props = useSpring({
      from: { opacity: 0, transform: ' scale(0) translateY(-60px)' },
      to: { opacity: 1, transform: ' scale(1) translateY(0px)' },
      delay: 300,
     });

    const props2 = useSpring({
      from: { opacity: 0, transform: 'translateY(50px)'},
      to: { opacity: 1, transform: 'translateY(0px)'},
      delay: 600,
    });

    const showStyle =  () => {
      return !isActive ? (
        {
          opacity: "0",
        }
      ) : (
        {
          opacity: "1",
        }
      )
    }

    const formHandler = (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFile(file);
    }

    const uploadFile = async (file) => {
      if(!file) return;

      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        console.log("Uploading");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          setResArr((curr) => {
            return [...curr, {
              title: "file",
              response: url
            }]
          })
        })
      }
      )
    }

    useEffect(() => {
      if(resArr.length > 0){
        console.log("Firestore");
        // sendMail();

        setDoc(doc(db, "userResponse", Cookies.get('uid')), {
          queRes: resArr
        });
      }

    }, [resArr])

    useEffect(() => {
      sendMail();
    }, [isChatCompleted])

    return (
      <animated.div style={showStyle()} className="chatWindow">
        {!chatGoingOn ? (
          <div className="header" style={{background: `${config.botColor}` }}>
            <img className="logo" src={config.logoImage} />
            <h2>{config.botName} Bot</h2>
            <p>{config.subTitle}</p>
          </div>
        ) : (
          <div className="chatActiveHead" style={{background: `${config.botColor}` }}>
            <h2>{config.botName} Bot</h2>
            <p>{config.subTitle}</p>
          </div>
        )}

        {chatGoingOn ? (
          !isChatCompleted ? (
            <>
              <Chatbot baseURL={baseURL} setUserEmail={setUserEmail} setIsChatCompleted={setIsChatCompleted} setResArr={setResArr}/>
              <form onSubmit={formHandler}>
                <input type="file"/>
                <button type="submit">Submit</button>
              </form>

            </>
          ) : (
            <WhatsappIcon />
            )
          ) : (
          <animated.div style={{...props2, borderColor: `${config.botColor2}`}} className="startConversationCon">
            <p>Start a conversation</p>
            <button onClick={changeChatState} style={{color: `${config.botColor}` }}>
              <svg focusable="false" aria-hidden="true" viewBox="0 0 15 16" className="intercom-am7pon ep90zfb0">
                <g transform="translate(-24.000000, -12.000000)">
                  <path fill={config.botColor} d="M25.4036262,27.3409362 C24.4176893,27.8509036 23.8195834,27.3951055 24.0683403,26.3201996 L25.0887779,21.910776 C25.2131242,21.3734618 25.7510472,20.8884231 26.3078778,20.8254187 L32.503417,20.1244045 C34.151155,19.9379658 34.1569707,19.6389088 32.503417,19.4549971 L26.3078778,18.7659164 C25.7589338,18.7048617 25.2129433,18.217839 25.0887779,17.6798715 L24.0683403,13.2586546 C23.8198614,12.1820783 24.408944,11.7182276 25.4036262,12.2327184 L38.22304,18.8634497 C39.208977,19.373417 39.2177223,20.1957141 38.22304,20.7102049 L25.4036262,27.3409362 Z">
                  </path>
                </g>
              </svg>
              <span>
                Send us a message
              </span>
            </button>
          </animated.div>
        )}
      </animated.div>
    )
}

export default AnimatedChatWindow;
