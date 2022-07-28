import React, { useEffect } from "react";
import { generateRandomDraw } from "../Tournaments/Tournaments";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPLayersOnSubt } from "../../../redux/actions/index.js";
import { Row, Col } from "react-bootstrap";
import styles from "./TournamentsAllAgainst.module.css";
// verificacion entre los inscriptos que user === team o que 2 user sean parte de un team

export const TournamentsAllAgainst = () => {
  const players = useSelector((state) => state.rootReducer.playersOnSubt);
  let team = players.map((x) => x.id_user);
  const array = team;
  console.log("array", array);
  const tournaments = generateRandomDraw(array);
  console.log("tournaments", tournaments);

  const dispatch = useDispatch();
  const { subt_id } = useParams();
  //   const { data: games } = generator(team, { type: "simple-cup" });

  //   console.log(games, "asdasdasd");
  useEffect(() => {
    dispatch(getPLayersOnSubt(subt_id));
  }, [dispatch, subt_id]);

  return (
    <div
      style={{ paddingTop: "56px", minHeight: "100vh" }}
      className="d-flex flex-sm-column flex-column flex-lg-row flex-md-row"
    >
       
      <Row className="g-3 mx-3 mt-2">
        <h1 className={styles.title}>Tournament All vs All(date..)</h1>
        {tournaments?.map((x) => {
          return (
            <div>
             
              <div className={styles.imageBox}></div>
              <Col lg={6} md={4} sm={4}>
                <div className={styles.formBox} key={x.id_user}>
                  {`${x.name}: `}
                </div>
                <div className={styles.matchBox} key={x.id_user}>
                  <h5>{`Match 1: ${x.value[0].teamA}  ::vs::  ${x.value[0].teamB} `}</h5>
                </div>

                <div className={styles.matchBox} key={x.id_user}>
                  <h5>{`Match 2: ${x.value[1].teamA}  ::vs::  ${x.value[1].teamB} `}</h5>
                </div>

                <div className={styles.matchBox} key={x.id_user}>
                  <h5>{`Match 3: ${x.value[2].teamA}  ::vs::  ${x.value[2].teamB} `}</h5>
                </div>
                <div className={styles.matchBox} key={x.id_user}>
                  <h5>{`Match 4: ${x.value[3].teamA}  ::vs::  ${x.value[3].teamB} `}</h5>
                </div>
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
};
