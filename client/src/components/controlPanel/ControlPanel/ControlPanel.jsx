import { getAllSponsors, getAllUsers, getGestion } from "../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ControlPanel.module.css"
import ControlBar from "../ControlBar/ControlBar";
import ControlUserList from "../ControlUserList/ControlUserList";
import ControlSponsorsList from "../ControlSponsorsList/ControlSponsorsList";
import ControlSubtournamentsList from "../ControlSubtournamentsList/ControlSubtournamentsList";
import ControlTournamentsList from "../ControlTournamentsList/ControlTournamentsList";
import { DashBoard } from "../DashBoard/DashBoard";


export default function ControlPanel() {
  const [show, setShow] = useState("users");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getGestion(1));
    dispatch(getAllSponsors());
  }, [dispatch]);
  
  return (
    <div className={styles.containerBox}>
      <ControlBar setShow={setShow}/>
      <div className={styles.principalBox}>
          {show === "users" && <ControlUserList />}
          {show === "sponsors" && <ControlSponsorsList/>}
          {show === "tournaments" && <ControlTournamentsList />}
          {show === "subtournaments" && <ControlSubtournamentsList />}
          {show === "dashboard" && <DashBoard/>}
          
      </div>
    </div>
  );
}
