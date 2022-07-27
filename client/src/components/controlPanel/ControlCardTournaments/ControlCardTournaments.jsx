import React from "react";
import { useDispatch } from "react-redux";
import styles from "./ControlCardTournaments.module.css"
import deleteimg from "../../../img/delete.png";
import edit from "../../../img/edit.png";
import Swal from "sweetalert2"
import { deleteTournament } from "../../../redux/actions";


export default function ControlCardTournaments({tournament, setDataModal, setUpdateList, updateList}) {
  function handleEdit(e) { 
    e.preventDefault()
    setDataModal(tournament)
  }

  const dispatch = useDispatch();

  function handleDelete(e) { 
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A7D129',
      cancelButtonColor: 'rgb(43, 43, 44);',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTournament(tournament.id_tournament))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        setUpdateList(!updateList)
      }
    })
  }

  return (
    <div className={styles.box}>
    <div className={styles.itemScore}>
      <div className={styles.subtitle}>      
      <h5 className={styles.data}>Tournament: {tournament.name}</h5>
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
            onClick={(e)=>handleDelete(e)}
          />
      </div>
     
      </div>     
    </div>  );
}
