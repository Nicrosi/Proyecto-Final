import React from "react";
import { getAllUsers} from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ControlTournamentsList.module.css"
import ControlCardTournaments from "../ControlCardTournaments/ControlCardTournaments";


export default function ControlTournamentsList() {
  const tournaments = useSelector((state) => state.rootReducer.tournaments);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className={styles.userBox}>
      {tournaments &&
        tournaments.map((p) => {
          return (
              <ControlCardTournaments 
                id_tournaments={p.id_tournaments}
                name={p.name}
                date={p.date}
                location={p.location}
                earning={p.earning}
              />
          )})}
    </div>
  );
}
