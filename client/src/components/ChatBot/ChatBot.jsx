import React, { useState } from "react";
import styles from "./ChatBot.module.css";
import img from "../../img/imgBot.png";

import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { useSelector } from "react-redux";

export const ChatBot = () => {
  const [showBot, setShowBot] = useState(false);
  const {is_admin} = useSelector(state => state.auth.currentUser)

  const saveMessages = (messages, HTMLString) => {
    console.log("save");
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  const handleShow = (e) => {
    setShowBot((prev) => !prev);
  };
  return (
    <>
      {showBot && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
        />
      )}
      {!is_admin ?  
      (<button className={styles.btnBot}>
        <img
          className={styles.img}
          onClick={handleShow}
          src={img}
          alt="botImg"
        />
      </button>) : null
      }
      
    </>
  );
};
