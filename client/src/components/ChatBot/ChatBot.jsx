import React, { useState } from "react";
import styles from "./ChatBot.module.css";
import img from "../../img/imgBot.png";

import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

export const ChatBot = () => {
  const [showBot, setShowBot] = useState(false);

  const handleShow = (e) => {
    setShowBot(!showBot);
  };
  return (
    <>
      {showBot ? (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      ) : null}
      <button className={styles.btnBot}>
        <img
          className={styles.img}
          onClick={handleShow}
          src={img}
          alt="botImg"
        />
      </button>
    </>
  );
};
