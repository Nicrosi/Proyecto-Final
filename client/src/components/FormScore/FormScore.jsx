import React, { useState } from "react";
import { StarsRating } from "../StarsRating/StarsRating";
import axios from "axios";
import styles from "./FormScore.module.css"
import Swal from "sweetalert2";



export const FormScore = ({params, setShowEditScore}) => {
  // const userId = props.match.params.userId;
  const [score, setScore] = useState({
    previous_tournaments: 0,
    hit_knowledge: 0,
    other_strokes: 0,
    special_hits: 0,
    kick_serve_control: 0,
    game_strategy: 0,
  });


  const handleSubmit = async function (e) {
    await axios.post(`http://localhost:3001/score/${params}`,
      score,
    );
    Swal.fire({
      title: 'Success',
      text: "User created successfully",
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#A7D129',
      cancelButtonColor: '#A7D129',
      confirmButtonText: ' Okey '
    })
    setShowEditScore(true);
  };

  const [error, setError] = useState({
    previous_tournaments: "init",
    hit_knowledge: "init",
    other_strokes: "init",
    special_hits: "init",
    kick_serve_control: "init",
    game_strategy: "init",
  });

  return (
  
    <div className={styles.box}>
      
      <form onSubmit={(e) => handleSubmit(e)} style={{width: "100%"}}>
          <ul className="list-group">
            <li className="list-group-item">
              <div className={styles.itemScore}>
                <div className={styles.subtitle}>
                  <h5 className="card-text">Previous tournaments</h5>
                  {error.previous_tournaments === "init"?<br />:(error.previous_tournaments?<p className="text-danger">{error.previous_tournaments} ✗</p>:<p className="text-success">Looks good ✓</p>)}
                </div>
                  <StarsRating
                    score={score}
                    setScore={setScore}
                    scoreName={"previous_tournaments"}
                    setError={setError}
                  />
              </div>  
                
            </li>
            <li className="list-group-item">
            <div className={styles.itemScore}>
              <div className={styles.subtitle}>
                <h5 className="card-text">Hit knowledge</h5>
                {error.hit_knowledge === "init"?<br />:(error.hit_knowledge?<p className="text-danger">{error.hit_knowledge} ✗</p>:<p className="text-success">Looks good ✓</p>)}
                </div>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"hit_knowledge"}
                  setError={setError}
                />
              </div>
                
            </li>
            <li className="list-group-item">
            <div className={styles.itemScore}>
              <div className={styles.subtitle}>
                <h5 className="card-text">Other strokes</h5>
                {error.other_strokes === "init"?<br />:(error.other_strokes?<p className="text-danger">{error.other_strokes} ✗</p>:<p className="text-success">Looks good ✓</p>)}
              </div>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"other_strokes"}
                  setError={setError}
                />
              </div>  
            </li>
            <li className="list-group-item">
            <div className={styles.itemScore}>
              <div className={styles.subtitle}>
                <h5 className="card-text">Special hits</h5>
                {error.special_hits === "init"?<br />:(error.special_hits?<p className="text-danger">{error.special_hits} ✗</p>:<p className="text-success">Looks good ✓</p>)}
              </div>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"special_hits"}
                  setError={setError}
                />
            </div>    
            </li>
            <li className="list-group-item">
            <div className={styles.itemScore}>
              <div className={styles.subtitle}>
                <h5 className="card-text">Kick serve control</h5>
                {error.kick_serve_control === "init"?<br />:(error.kick_serve_control?<p className="text-danger">{error.kick_serve_control} ✗</p>:<p className="text-success">Looks good ✓</p>)}
              </div>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"kick_serve_control"}
                  setError={setError}
                />
            </div>
            </li>
            <li className="list-group-item">
            <div className={styles.itemScore}>
              <div className={styles.subtitle}>
                <h5 className="card-text">Game strategy</h5>
                {error.game_strategy === "init"?<br />:(error.game_strategy?<p className="text-danger">{error.game_strategy} ✗</p>:<p className="text-success">Looks good ✓</p>)}
              </div>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"game_strategy"}
                  setError={setError}
                />
            </div>
            </li>
          </ul>
     
          <div className="d-grid gap-2 my-3">
          {Object.keys(error).length > 0 ? (
              <button className="btn btn-secondary" style={{ backgroundColor: "#A7D129" }} type="submit" disabled>
                Create
              </button>
            ) : (
              <button className="btn btn-success" style={{ backgroundColor: "#A7D129" }} type="submit">Create</button>
            )}
          </div>
      </form>
    </div>

  );
};