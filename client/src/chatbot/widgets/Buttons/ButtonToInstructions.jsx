import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const ButtonToInstructions = () => {
  const handleClick = () => {
    setTimeout(() => {
      const element = document.getElementById("instruction");
      if (element) element.scrollIntoView();
    }, 100);
  };
  return (
    <div className={styles.containerBtn}>
      <Link to="/">
        <button className={styles.btn} onClick={handleClick}>
          <span>Instructions</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonToInstructions;
