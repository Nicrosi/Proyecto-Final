import React from "react";
import { useDispatch } from "react-redux";
import { changePanelPage, getAllSponsors, getAllSubtournaments, getAllUsers, getTournament } from "../../../redux/actions";
import styles from "./ControlBar.module.css"
import ControlSearchBar from "./ControlSearchBar/ControlSearchBar";

export default function ControlBar({setShow}) {
 
  const dispatch = useDispatch();

  function handleClic(e){
    setShow(e.target.name);
    dispatch(changePanelPage(e.target.name.slice(0,-1)))
  };

  function handleReload(e){
    e.preventDefault();
    dispatch(getAllUsers())
    dispatch(getTournament())
    dispatch(getAllSubtournaments())
    dispatch(getAllSponsors())
  };
  return (
    <div className={styles.PanelBox}>
      <h5 className={styles.title}>Control Panel</h5>
      <ControlSearchBar />
      <br />
      <input type="submit" name="users" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="USERS"/>
      <input type="submit" name="tournaments" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="TOURNAMENTS"/>
      <input type="submit" name="subtournaments" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="SUBTOURNAMENTS"/>
      <input type="submit" name="sponsors" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="SPONSORS"/>
      <input type="submit" name="dashboard" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="DASHBOARD"/>
      <br/>
      <input type="submit" onClick={(e) => handleReload(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="RELOAD"/>
    </div>
  );
}
