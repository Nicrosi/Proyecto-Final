import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../img/SYNNET_mini_icon.png";



export default function Footer() {

  return (
      <div className={styles.footerBox}>
         <img src={logo} alt="logoSynnet" style={{height: "60px", marginLeft: "30px"}} />
        <div className={styles.subtitlesBox}>
        <h5  className={styles.title}>ABOUT US</h5>
        <h5  className={styles.title}>Copyright © {new Date().getFullYear()} Synnet</h5>   
        </div> 
      </div>
  );
}