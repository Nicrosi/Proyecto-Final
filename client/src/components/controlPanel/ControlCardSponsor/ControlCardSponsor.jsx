import React from "react";
import deleteimg from "../../../img/delete.png";
import edit from "../../../img/edit.png";
import styles from "./ControlCardSponsor.module.css"

export default function ControlCardSponsor({sponsor, setDataModal, setUpdateList, updateList}) {
  function handleEdit(e) { 
    e.preventDefault()
    setDataModal(sponsor)
  }

  return (
    <div className={styles.box}>
    <div className={styles.itemScore}>
      <div className={styles.subtitle}>      
      <h5 className={styles.data}>Company: {sponsor.company}</h5>
      </div>
      <div className={styles.itemScore}>
      <img
            src={edit}
            alt="buttonedit"
            className={styles.button} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
            onClick={(e)=>handleEdit(e)}
          />
      <img
            src={deleteimg}
            alt="buttondelete"
            className={styles.button} type="button" 
          />
      </div>
     
      </div>     
    </div>
  );
}
