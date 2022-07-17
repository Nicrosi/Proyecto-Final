import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import styles from "./DetailsUser.module.css";

const DetailsUser = (props) => {
  const params = Number(props.match.params.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(params));
  }, [dispatch, params]);

  let user = useSelector((state) => state.rootReducer.user);

  console.log(user);

  return (
    <React.Fragment>
      {user && (
        <div className={styles.containerBox}>
          <div className={styles.PanelBox}>
            <img src={user.picture} className={styles.pictureUser} alt="..." />
            <h1 className={styles.nameUser}>{user.name}</h1>
            <h1 className={styles.nameUser}>{user.last_name}</h1>
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
                          <h5 className="card-text">E-mail: {user.e_mail}</h5>
                        </li>
                        <li className="list-group-item">
                          <h5 className="card-text">Gender: {user.gender}</h5>
                        </li>
                        <li className="list-group-item">
                          <h5 className="card-text">Phone: {user.phone}</h5>
                        </li>
                        <li className="list-group-item">
                          {" "}
                          <h5 className="card-text">
                            Emergency contact: {user.num_contact}
                          </h5>
                        </li>
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
                          {user.category ? (
                            <div>
                              <h1 className="card-title">
                                {user.category.type.toUpperCase()}
                              </h1>
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-dark my-2"
                              >
                                Modify
                              </button>
                            </div>
                          ) : (
                            <div>
                              <h3 className="card-title">
                                {`${user.name} doesn't have a Category. Creation of a score is needed to define the category`}
                              </h3>
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-dark my-2"
                                disabled
                              >
                                Modify
                              </button>
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
                          {user.score ? (
                            <ul className="list-group">
                              <li className="list-group-item">
                                <h5>
                                  Previous Tournaments:{" "}
                                  {user.score.previous_tournaments}
                                </h5>
                              </li>
                              <li className="list-group-item">
                                <h5>
                                  Hit knowledge: {user.score.hit_knowledge}
                                </h5>
                              </li>
                              <li className="list-group-item">
                                <h5>
                                  Other strokes: {user.score.other_strokes}
                                </h5>
                              </li>
                              <li className="list-group-item">
                                <h5>Special hits: {user.score.special_hits}</h5>
                              </li>
                              <li className="list-group-item">
                                <h5>
                                  Kick serve control:{" "}
                                  {user.score.kick_serve_control}
                                </h5>
                              </li>
                              <li className="list-group-item">
                                <h5>
                                  Game strategy: {user.score.game_strategy}
                                </h5>
                              </li>
                            </ul>
                          ) : (
                            <h3>{`${user.name} has no score`}</h3>
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
