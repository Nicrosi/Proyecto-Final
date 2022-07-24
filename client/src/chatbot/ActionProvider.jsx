import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Tennis player.");

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleState = () => {
    const botMessage = createChatBotMessage(
      "Bien, gracias! nunca nadie se habia preocupado por mí :')"
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleOptions = () => {
    const botMessage = createChatBotMessage("These are some options.", {
      widget: "overview",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleSponsors = () => {
    const botMessage = createChatBotMessage(
      "To see the sponsors of the tournament you can click on the button below.",
      { widget: "sponsors" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleInscription = () => {
    const botMessage = createChatBotMessage(
      "We have instructions for that on the main page. I can take you there if you click the button below.",
      { widget: "instruction" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleContact = () => {
    const botMessage = createChatBotMessage(
      "You can contact the organizer by the following means.",
      { widget: "contact" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleTournament = () => {
    const botMessage = createChatBotMessage(
      "To see details of the tournament, you can click on the following button.",
      { widget: "tournament" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleState,
            handleOptions,
            handleSponsors,
            handleInscription,
            handleContact,
            handleTournament,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
