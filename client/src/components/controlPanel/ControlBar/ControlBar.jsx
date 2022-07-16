import React from "react";
import styles from "./ControlBar.module.css"

export default function ControlBar({setShow}) {
 
  function handleClic(e){
    setShow(e.target.name)
  };
  return (
    <div className={styles.PanelBox}>
      <h5 className={styles.title}>Control Panel</h5>
      <input type="submit" name="users" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="USERS"/>
      <input type="submit" name="tournaments" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="TOURNAMENTS"/>
      <input type="submit" name="subtournaments" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="SUBTOURNAMENTS"/>
      <input type="submit" name="sponsors" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="SPONSORS"/>
    </div>
  );
}
