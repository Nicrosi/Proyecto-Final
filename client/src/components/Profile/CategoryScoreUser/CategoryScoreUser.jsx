import React from "react";
import { Link } from "react-router-dom";
import styles  from "./CategoryScoreUser.module.css"


export default function CategoryScoreUser({params, user}) {

    return (
        <React.Fragment>
            {user && (
                <div className={styles.box}>
                  <ul className="list-group">
                    <li className="list-group-item">
                    <div className="card-body text-center">
                            {user.category ? (
                              <div>
                                <h1 className="card-title">{user.category.type.toUpperCase()}</h1>
                              </div>
                            ) : (
                              <div>
                                <h5>{`${user.name} you do not have a Category, you must create a score to define your category`}</h5>
                                <Link to={`/CreateScore/${params}`}>
                                  <button type="button" className="btn btn-outline-secondary btn-dark my-2">
                                    Create score
                                  </button>
                                </Link>
                              </div>
                            )}
                          </div>
                    </li>
                  </ul>

                  {user.score && (
                    <ul className="list-group" style={{marginTop: "20px"}}>
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
                        <h5>
                          Special hits: {user.score.special_hits}
                        </h5>
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
                  ) }

                                    



                      </div>
             
                            
            )}
        </React.Fragment>
    )
}
  