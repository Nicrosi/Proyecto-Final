import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSubtournament } from "../../redux/actions";
import { Row, Col } from "react-bootstrap";
import SubtCard from "./SubtCard";

export const Inscription = () => {
  const subt = useSelector((state) => state.rootReducer.filteredSubt)
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const {tournament_id} = useParams();
  const history = useHistory();
  console.log(user)
  useEffect(() => {
    dispatch(getSubtournament(tournament_id));
    if(!user.id_category){ 
      alert(`The user ${user.name} has no score to categorize`)
      history.push("/HomeAdmin");
            }
  }, [dispatch, tournament_id])
  return (
    <div
      style={{ paddingTop: "56px", minHeight: "100vh" }}
      className="d-flex flex-sm-column flex-column flex-lg-row flex-md-row"
    > 
    <h1>Welcome, {user.name}</h1>
    <div style={{ width: "100%" }}>
    <Row className="g-3 mx-3 mt-2">
     {subt.length > 0 ? (
            subt.map((p) => {
             
              return (
                user.gender === p.gender && user.id_category === p.category.id_category ?
                <Col lg={3} key={p.id_subt}>
                  <SubtCard
                    key={p.id_subt}
                    name={p.name}
                    id_tournament={tournament_id}
                    price={p.price}
                    subt_gender = {p.gender}
                    subt_category = {p.category}
                    id_user={user.id_user}
                    email={user.e_mail}
                  />
                </Col>:null
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