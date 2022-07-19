import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTournament } from "../../../redux/actions/index";


import { Row, Col } from "react-bootstrap";
import { TournamentCard } from "../TournamentCard/TournamentCard";

function TournamentsToShow() {
  const tournaments = useSelector((state) => state.rootReducer.tournaments);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTournament());
  }, [dispatch]);

  return (
    <div
      style={{ paddingTop: "56px", minHeight: "100vh" }}
      className="d-flex flex-sm-column flex-column flex-lg-row flex-md-row"
    >
      <h1
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "4rem",
          margin: "0 0 0 30px",
          color: " #A7D129",
        }}
      >
        Tournaments
      </h1>
      <div style={{ width: "100%" }}>
        <Row className="g-3 mx-3 mt-2">
          {tournaments &&
            tournaments.map((e) => {
              return (
                <div key={e.id_tournament}>
                <Col>
                  <TournamentCard
                    key={e.id_tournament}
                    id={e.id_tournament}
                    name={e.name}
                    date={e.date}
                    location={e.location}
                  />
                </Col>
                </div>
              );
            })}
        </Row>
      </div>
    </div>
  );
}

export default TournamentsToShow;
