import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    message = message.toLowerCase();
    if (message.includes("hello") || message.includes("hi")) {
      actions.handleHello();
    }
    if (message.includes("como estas")) {
      actions.handleState();
    }
    if (message.includes("sponsor")) {
      actions.handleSponsors();
    }
    if (
      message.includes("instruction") ||
      message.includes("inscription") ||
      message.includes("register")
    ) {
      actions.handleInscription();
    }
    if (message.includes("options") || message.includes("frequent questions")) {
      actions.handleOptions();
    }
    if (message.includes("tournament")) {
      actions.handleTournament();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
