import React from "react";
import styles from "./Button.module.css";
import mailIcon from "../../../img/correo-icon.png";
import phoneIcon from "../../../img/phone-icon.png";

const ButtonContact = () => {
  return (
    <div className={styles.containerBtn}>
      <a href="mailto:admin@gmail.com">
        <button className={styles.btnEmail}>
          <img src={mailIcon} alt="mail" />
        </button>
      </a>
      <a href="tel:942033303">
        <button className={styles.btnTel}>
          <img src={phoneIcon} alt="phone" />
        </button>
      </a>
    </div>
  );
};
export default ButtonContact;
