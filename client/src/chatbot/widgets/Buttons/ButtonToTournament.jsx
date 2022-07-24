import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const ButtonToTournament = () => {
  return (
    <div className={styles.containerBtn}>
      <Link to="/TournamentsToShow">
        <button className={styles.btn}>
          <span>Tournaments</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonToTournament;
