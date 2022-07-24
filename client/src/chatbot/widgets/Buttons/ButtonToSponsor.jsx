import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const ButtonToSponsor = (props) => {
  const handleClick = () => {
    setTimeout(() => {
      const element = document.getElementById("sponsorLP");
      if (element) element.scrollIntoView();
    }, 100);
  };
  return (
    <div className={styles.containerBtn}>
      <Link to="/">
        <button className={styles.btn} onClick={handleClick}>
          <span>Sponsors</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonToSponsor;
