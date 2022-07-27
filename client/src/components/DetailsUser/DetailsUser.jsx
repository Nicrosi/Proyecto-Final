import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import { RadarChart } from "../Charts/RadarChart/RadarChart";
import styles from "./DetailsUser.module.css";

// const DetailsUser = (props) => {
//   const params = Number(props.match.params.userId);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUserById(params));
//   }, [dispatch, params]);

//   let user = useSelector((state) => state.rootReducer.user);

const DetailsUser = ({ dataModal }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      {dataModal && (
        <div className={styles.containerBox}>
          <div className={styles.PanelBox}>
            <img src={dataModal.picture} className={styles.pictureUser} alt="..." />

            <div>
              <h1 className={styles.nameUser}>{dataModal.name}</h1>
              <h1 className={styles.nameUser}>{dataModal.last_name}</h1>
            </div>
          </div>
          <div className={styles.principalBox}>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button text-bg-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Personal Information
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h5 className="card-text">Full Name: {dataModal.name} {dataModal.last_name}</h5>
                        </li>
                        <li className="list-group-item">
                          <h5 className="card-text">Gender: {dataModal.gender}</h5>
                        </li>
                        <li className="list-group-item">
                          <h5 className="card-text">E-mail: {dataModal.e_mail}</h5>
                        </li>
                        {auth.loggedIn && auth.currentUser.is_admin === true ? (
                          <>
                          <li className="list-group-item">
                          <h5 className="card-text">Phone: {dataModal.phone}</h5>
                        </li>
                        <li className="list-group-item">
                          <h5 className="card-text">Emergency contact: {dataModal.num_contact}</h5>
                        </li>
                          </>) : null
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed text-bg-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Category
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="mx-auto" style={{ width: "100%" }}>
                      <div className="card mx-auto" style={{ width: "100%" }}>
                        <div className="card-body text-center">
                          {dataModal.category ? (
                            <div>
                              <h1 className="card-title">
                                {dataModal.category.type.toUpperCase()}
                              </h1>

                            </div>
                          ) : (
                            <div>
                              <h3 className="card-title">
                                {`${dataModal.name} doesn't have a Category. Creation of a score is needed to define the category`}
                              </h3>

                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed text-bg-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Score
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="mx-auto" style={{ width: "100%" }}>
                      <div className="card mx-auto" style={{ width: "100%" }}>
                        <div className="card-body text-center">


                          {dataModal.score ? (<div className={styles.secondBox}>
                            <div className={styles.scoreBox}>
                              <div>
                              <ul className="list-group">
                              <li className="list-group-item">
                                <h5 className={styles.scoreItem}>
                                  Previous Tournaments:{" "}
                                  {dataModal.score.previous_tournaments}
                                </h5>
                                </li>
                                <li className="list-group-item">
                                <h5 className={styles.scoreItem}>
                                  Hit knowledge: {dataModal.score.hit_knowledge}
                                </h5>
                                </li>
                                <li className="list-group-item">
                                <h5 className={styles.scoreItem}>
                                  Other strokes: {dataModal.score.other_strokes}
                                </h5>
                                </li>
                                <li className="list-group-item"> 
                                <h5 className={styles.scoreItem}>
                                  Special hits: {dataModal.score.special_hits}
                                </h5>
                                </li>
                                <li className="list-group-item">
                                <h5 className={styles.scoreItem}>
                                  Kick serve control:{" "}
                                  {dataModal.score.kick_serve_control}
                                </h5>
                                </li>
                                <li className="list-group-item">
                                <h5 className={styles.scoreItem}>
                                  Game strategy: {dataModal.score.game_strategy}
                                </h5>
                                </li>
                                </ul>
                              </div>
                             
                            </div>
                            <div className={styles.RadarBox}><RadarChart dataUser={dataModal.score} /></div>

                            {/* <ul className="list-group">
                                <li className="list-group-item">
                                  <h5 className={styles.scoreItem}>
                                    Previous Tournaments:{" "}
                                    {dataModal.score.previous_tournaments}
                                  </h5>
                                </li>
                                <li className="list-group-item">
                                  <h5 className={styles.scoreItem}>
                                    Hit knowledge: {dataModal.score.hit_knowledge}
                                  </h5>
                                </li>
                                <li className="list-group-item">
                                  <h5 className={styles.scoreItem}>
                                    Other strokes: {dataModal.score.other_strokes}
                                  </h5>
                                </li>
                                <li className="list-group-item">
                                  <h5 className={styles.scoreItem}>Special hits: {dataModal.score.special_hits}</h5>
                                </li>
                                <li className="list-group-item">
                                  <h5 className={styles.scoreItem}>
                                    Kick serve control:{" "}
                                    {dataModal.score.kick_serve_control}
                                  </h5>
                                </li>
                                <li className="list-group-item">
                                  <h5 className={styles.scoreItem}>
                                    Game strategy: {dataModal.score.game_strategy}
                                  </h5>
                                </li>
                              </ul>*/}


                          </div>
                          ) : (
                            <h3>{`${dataModal.name} has no score`}</h3>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailsUser;
