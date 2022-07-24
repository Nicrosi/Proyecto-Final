import { createChatBotMessage } from "react-chatbot-kit";
import ButtonContact from "./widgets/Buttons/ButtonContact";
import ButtonToInstructions from "./widgets/Buttons/ButtonToInstructions";
import ButtonToSponsor from "./widgets/Buttons/ButtonToSponsor";
import ButtonToTournament from "./widgets/Buttons/ButtonToTournament";
import Overview from "./widgets/Options/Overview";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hello, how can I help you? Below are some possible options.`,
      {
        widget: "overview",
      }
    ),
  ],
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props) => <Overview {...props} />,
    },
    {
      widgetName: "sponsors",
      widgetFunc: (props) => <ButtonToSponsor {...props} />,
    },
    {
      widgetName: "instruction",
      widgetFunc: (props) => <ButtonToInstructions {...props} />,
    },
    {
      widgetName: "contact",
      widgetFunc: (props) => <ButtonContact {...props} />,
    },
    {
      widgetName: "tournament",
      widgetFunc: (props) => <ButtonToTournament {...props} />,
    },
  ],
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
