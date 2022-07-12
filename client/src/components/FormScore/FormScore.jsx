import React, { useState } from "react";
import { StarsRating } from "../StarsRating/StarsRating";
import axios from "axios";

export const FormScore = (props) => {
  const userId = props.match.params.userId;
  const [score, setScore] = useState({
    previous_tournaments: 0,
    hit_knowledge: 0,
    other_strokes: 0,
    special_hits: 0,
    kick_serve_control: 0,
    game_strategy: 0,
  });


  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log("intentando hacer post");
    await axios.post(`http://localhost:3001/score/${userId}`, 
      score,
    );
    alert("successfully created user");
  };

  const [error, setError] = useState({
    previous_tournaments: "previous_tournaments is required",
    hit_knowledge: "hit_knowledge is required",
    other_strokes: "other_strokes is required",
    special_hits: "special_hits is required",
    kick_serve_control: "kick_serve_control is required",
    game_strategy: "game_strategy is required",
  });

  return (
    <div className="mb-3 mx-auto hstack justify-content-center" style={{ minHeight: "100vh", width: "85%"}}>
  
    <div className="mx-auto hstack justify-content-around" style={{ width: "100%" }}>
      
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className="hstack mb-3">
          <ul className="list-group list-group-horizontal mx-auto" style={{width:"100%"}}>
            <li className="list-group-item" style={{width:"30%"}}>
              <div >
                <h5 className="card-text">Previous tournaments</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"previous_tournaments"}
                  setError={setError}
                />{error.previous_tournaments?<p className="text-danger">{error.previous_tournaments} ✗</p>:<p className="text-success">Looks good ✓</p>}
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div>
                <h5 className="card-text">Hit knowledge</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"hit_knowledge"}
                  setError={setError}
                />{error.hit_knowledge?<p className="text-danger">{error.hit_knowledge} ✗</p>:<p className="text-success">Looks good ✓</p>}
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div >
                <h5 className="card-text">Other strokes</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"other_strokes"}
                  setError={setError}
                />{error.other_strokes?<p className="text-danger">{error.other_strokes} ✗</p>:<p className="text-success">Looks good ✓</p>}
              </div>
            </li>
          </ul>
        </div>
        <div className="hstack mb-3" >
          <ul className="list-group list-group-horizontal mx-auto" style={{width:"100%"}}>
            <li className="list-group-item" style={{width:"30%"}}>
              <div>
                <h5 className="card-text">Special hits</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"special_hits"}
                  setError={setError}
                />{error.special_hits?<p className="text-danger">{error.special_hits} ✗</p>:<p className="text-success">Looks good ✓</p>}
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div>
                <h5 className="card-text">Kick serve control</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"kick_serve_control"}
                  setError={setError}
                />{error.kick_serve_control?<p className="text-danger">{error.kick_serve_control} ✗</p>:<p className="text-success">Looks good ✓</p>}
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div>
                <h5 className="card-text">Game strategy</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"game_strategy"}
                  setError={setError}
                />{error.game_strategy?<p className="text-danger">{error.game_strategy} ✗</p>:<p className="text-success">Looks good ✓</p>}
              </div>
            </li>
          </ul>
          </div>    
          <div className="d-grid gap-2 mb-3" style={{width:"90%"}}>
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
    </div>
  );
};