import React from "react";
import styles from "./TournamentCard.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const TournamentCard = ({ id, name, date, location }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className={styles.card}>
      <div className={styles.textBox}>
        <h5 className={styles.name}>"{name}"</h5>
        <div className={styles.date_location}>
          <h5 className={styles.date_location}>{date.slice(0, 10)}</h5>
          <h5 className={styles.date_location}>{location.toUpperCase()}</h5>
        </div>
      </div>
      <div>        
        {
          !auth.loggedIn ? (
            <Link
                style={{ fontWeight: "bold", color: "#10242b" }}
                to={`/allSubt/${id}`}
              >
                <button
                  className="btn"
                  style={{ backgroundColor: "#A7D129" }}
                >
                  See All Subtournaments
                </button>
                </Link>
          ) : <>
            {auth.loggedIn && auth.currentUser.is_admin === false ? (
              <><Link
                style={{ fontWeight: "bold", color: "#10242b" }}
                to={`/inscription/${id}`}
              >
                <button className="btn" style={{ backgroundColor: "#A7D129" }}>
                  Inscription
                </button>{" "}
              </Link>
              <Link
                style={{ fontWeight: "bold", color: "#10242b" }}
                to={`/allSubt/${id}`}
              >
              <button
              className="btn"
              style={{ backgroundColor: "#A7D129" }}
              
            >
              See All Subtournaments
            </button></Link></>
            ) : (
              <>
                <Link
                  style={{ fontWeight: "bold", color: "#10242b" }}
                  to={`/CreateSubtournament/${id}`}
                >
                  <button className="btn" style={{ backgroundColor: "#A7D129", marginRight: "20px" }}>
                    Create Subtournament
                  </button>
                </Link>
             
              <Link
                style={{ fontWeight: "bold", color: "#10242b" }}
                to={`/inscription/${id}`}
              >
                <button
                  className="btn"
                  style={{ backgroundColor: "#A7D129" }}
                 
                >
                  See All Subtournaments
                </button>
                </Link>
              </>
            )
            }</>
    
          
        }
        
      </div>
    </div>
  );
};
