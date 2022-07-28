import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePanelPage, getAllSponsors, getAllSubtournaments, getAllUsers, getTournament } from "../../../redux/actions";
import styles from "./ControlBar.module.css"
import ControlSearchBar from "./ControlSearchBar/ControlSearchBar";
import FilterAdminPanel from "./FilterAdminPanel/FilterAdminPane";

export default function ControlBar({setShow}) {
 
  const dispatch = useDispatch();
  const [ FilterState, setFilterState ] = useState(false);
  const [ PanelPage, setPanelPage ] = useState('user');


  function handleClic(e){
    setShow(e.target.name);
    setPanelPage(e.target.name.slice(0,-1))
    if(e.target.name !== "dashboard") {
      dispatch(changePanelPage(e.target.name.slice(0,-1)))
    }
  };

  function HandlerFilterState(e) {
    e.preventDefault();
    setFilterState(!FilterState);
  }

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
      {
        PanelPage !== 'dashboar' && 
        <ControlSearchBar />
      }
      <br />
      <input type="submit" name="users" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="USERS"/>
      {
        PanelPage === 'user' &&
        (
          <>
          <input type="submit" onClick={(e) => HandlerFilterState(e)} className="btn btn-outline-secondary btn-ligth mb-2" style={{ width: "200px"}} value="FILTER USER BY"/>
          {
            FilterState ? (
              <div
                className={styles.Filter_btn_admin}
              >
                <FilterAdminPanel/>
              </div>
            )
            : <div></div>
          }
          </>
        )
      }
      <input type="submit" name="tournaments" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="TOURNAMENTS"/>
      <input type="submit" name="subtournaments" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="SUBTOURNAMENTS"/>
      <input type="submit" name="sponsors" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="SPONSORS"/>
      <input type="submit" name="dashboard" onClick={(e) => handleClic(e)} className="btn btn-outline-dark mb-2" style={{ backgroundColor: "#A7D129", width: "200px"}} value="DASHBOARD"/>
      <br/>
      <input type="submit" onClick={(e) => handleReload(e)} className="btn btn-outline-secondary btn-ligth mb-2" style={{ width: "200px"}} value="RELOAD"/>
    </div>
  );
}
