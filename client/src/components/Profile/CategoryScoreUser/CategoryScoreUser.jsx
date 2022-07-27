import React, { useState } from "react";
import { RadarChart } from "../../Charts/RadarChart/RadarChart";
import { FormScore } from "../../FormScore/FormScore";
import styles from "./CategoryScoreUser.module.css"


export default function CategoryScoreUser({ params, user }) {
  const [showEditScore, setShowEditScore] = useState(true);

  function handleClicShowEdit() {
    setShowEditScore(false);
  }
  return (
    <React.Fragment>
      {user && (
        <div className={styles.box}>
          {showEditScore === false ? (
            <FormScore params={params} setShowEditScore={setShowEditScore} />
          ) :
            (<>
              <ul className="list-group" style={{ width: "100%" }}>
                <li className="list-group-item">

                  <div className={styles.category}>
                    {user.category ? (
                      <h1 style={{ margin: "0" }}>{user.category.type.toUpperCase()}</h1>
                    ) : (
                      <div>
                        <h5>{`${user.name} you do not have a Category, you must create a score to define your category`}</h5>
                        <button type="button" className="btn btn-outline-secondary btn-dark my-2" onClick={() => handleClicShowEdit()}>
                          Create score
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
              {user.score && (<div className={styles.secondBox}>
                <div className={styles.scoreBox}>
                  <div>
                    <ul className="list-group">
                    <li className="list-group-item">
                      <h5 className={styles.scoreItem}>
                        Previous Tournaments:{" "}
                        {user.score.previous_tournaments}
                      </h5>
                    </li>
                    <li className="list-group-item">
                      <h5 className={styles.scoreItem}>
                        Hit knowledge: {user.score.hit_knowledge}
                      </h5>
                    </li>
                    <li className="list-group-item">
                      <h5 className={styles.scoreItem}>
                        Other strokes: {user.score.other_strokes}
                      </h5>
                    </li>
                    <li className="list-group-item">
                      <h5 className={styles.scoreItem}>
                        Special hits: {user.score.special_hits}
                        </h5>
                    </li>
                    <li className="list-group-item">
                      <h5 className={styles.scoreItem}>
                        Kick serve control:{" "}
                        {user.score.kick_serve_control}
                      </h5>
                    </li>
                    <li className="list-group-item">
                      <h5 className={styles.scoreItem}>
                        Game strategy: {user.score.game_strategy}
                      </h5>
                    </li>
                  </ul></div>

                </div>
                <div className={styles.RadarBox}><RadarChart dataUser={user.score} /></div>

             </div>
              )}
            </>
            )}
        </div>
      )}
    </React.Fragment>
  )
}
