import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubtournament } from "../../redux/actions";
import { Row, Col } from "react-bootstrap";
import SubtCard from "./SubtCard";

export const Inscription = () => {
  const subt = useSelector((state) => state.filteredSubt)
  const dispatch = useDispatch();
  const {tournament_id} = useParams();

  useEffect(() => {
    dispatch(getSubtournament(tournament_id));
  }, [dispatch, tournament_id])
  return (
    <div
      style={{ paddingTop: "56px", minHeight: "100vh" }}
      className="d-flex flex-sm-column flex-column flex-lg-row flex-md-row"
    > 
    <div style={{ width: "100%" }}>
    <Row className="g-3 mx-3 mt-2">
     {subt.length > 0 ? (
            subt.map((p) => {
              return (
                <Col lg={3} key={p.id_subt}>
                  <SubtCard
                    key={p.id_subt}
                    name={p.name}
                    id_tournament={tournament_id}
                    price={p.price}
                  />
                </Col>
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>No sub tournament found</h1>
          )}
          </Row>
          </div>
    </div>
  );
}