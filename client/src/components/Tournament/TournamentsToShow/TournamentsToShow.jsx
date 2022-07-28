import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTournament } from "../../../redux/actions/index";
import styles from "./TournamentsToShow.module.css";
import { TournamentCard } from "../TournamentCard/TournamentCard";
import { Link } from "react-router-dom";

function TournamentsToShow() {
  const tournaments = useSelector((state) => state.rootReducer.tournaments);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTournament());
  }, [dispatch]);

  return (
    <div className={styles.containerBox}>
      {
        tournaments.length ? 
        <>
        <h1 className={styles.title}>Next Tournament</h1>
        <div className={styles.principalBox}>
            {
              tournaments.length ?
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
                })
              : 
              (
                <div>
                  <h1 className={styles.title}>Next Tournament</h1>
                </div>
              )
            }
        </div>
        </>
        : 
        <div>
          {
            auth.loggedIn && auth.currentUser.is_admin ?
            <>
              <h1 className={styles.message}>No tournaments Created</h1>
              <Link to='/CreateTournament'>
              <input 
                className="btn btn-outline-dark ml-20" 
                style={{ backgroundColor: "#A7D129", fontWidth: "bold", margin: "0 0 0 40vw", width: "20vw"}} 
                value="CREATE TOURNAMENT"
              />
              </Link>
            </>
            :
            <>
              <h1 className={styles.message}>No tournaments available</h1>
            </>
          }
        </div>
      }
    </div>
  );
}

export default TournamentsToShow;
