import React from "react";
import img1 from "../../../assets/fototenis.jpg";
import styles from "./TournamentCard.module.css";
import { Link } from "react-router-dom";
export const TournamentCard = ({ id, name, date, location }) => {
  return (
    <div
      style={{
        textDecoration: "none",
        color: "black",
        height: "130%",
        width: "400px",
      }}
    >
      <div className={`card ${styles.card}`}>
        <div
          className="d-flex flex flex-md-row flex-lg-row"
          style={{ height: "250px" }}
        >
          <div className={`${styles.pictureContainer} col-md-5 col-sm-3`}>
            <img
              className={`${styles.picture} rounded-start`}
              src={img1}
              alt="img"
            />
          </div>
          <div
            className="col-md-7 col-sm-5 mb-4"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="card-body">
              <h5 className="card-title">Name:{name}</h5>
              <h5 className="card-title">Date:{date}</h5>
              <h5 className="card-text mt-2 mb-0">Location: {location}</h5>
            </div>
            <div>
              <button style={{ backgroundColor: "#A7D129" }}>
                <Link
                  style={{ fontWeight: "bold", color: "#10242b" }}
                  to={`/inscription/${id}`}
                >
                  Inscription
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
