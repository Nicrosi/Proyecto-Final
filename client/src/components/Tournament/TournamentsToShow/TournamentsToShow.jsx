import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTournament } from "../../../redux/actions/index";
import styles from "./TournamentsToShow.module.css";

import { Row, Col } from "react-bootstrap";
import { TournamentCard } from "../TournamentCard/TournamentCard";

function TournamentsToShow() {
  const tournaments = useSelector((state) => state.rootReducer.tournaments);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTournament());
  }, [dispatch]);

  return (
    <div className={styles.containerBox}>
      <h1 className={styles.title}>Next Tournament</h1>
      <div className={styles.principalBox}>
          {tournaments &&
            tournaments.map((e) => {
              return (
                  <TournamentCard
                    key={e.id_tournament}
                    id={e.id_tournament}
                    name={e.name}
                    date={e.date}
                    location={e.location}
                  />
              );
            })}
      </div>
    </div>
  );
}

export default TournamentsToShow;
