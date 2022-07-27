import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../img/SYNNET_icon.png";



export default function Footer() {

  return (
      <div className={styles.footerBox}>
        <h5  className={styles.title}>ABOUT US</h5>
        <Link to="/">
        <img src={logo} alt="logoSynnet" style={{width: "140px"}} />
        </Link>    
        <h5  className={styles.title}>Copyright blablabla</h5>   
      </div>
  );
}
