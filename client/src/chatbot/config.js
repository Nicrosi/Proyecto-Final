import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [createChatBotMessage(`Hello, how can I help you?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#212529",
    },
    chatButton: {
      backgroundColor: "#A7D129",
    },
  },
};

export default config;
