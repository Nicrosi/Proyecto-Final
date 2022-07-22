import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    message = message.toLowerCase();
    if (message.includes("hello") || message.includes("hi")) {
      actions.handleHello();
    }
    if (message.includes("como estas?") || message.includes("Como estas?")) {
      actions.handleState();
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
