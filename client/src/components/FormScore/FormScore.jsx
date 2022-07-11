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
                />
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div>
                <h5 className="card-text">Hit knowledge</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"hit_knowledge"}
                />
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div >
                <h5 className="card-text">Other strokes</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"other_strokes"}
                />
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
                />
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div>
                <h5 className="card-text">Kick serve control</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"kick_serve_control"}
                />
              </div>
            </li>
            <li className="list-group-item" style={{width:"30%"}}>
              <div>
                <h5 className="card-text">Game strategy</h5>
                <StarsRating
                  score={score}
                  setScore={setScore}
                  scoreName={"game_strategy"}
                />
              </div>
            </li>
          </ul>
          </div>    
          <div className="d-grid gap-2 mb-3" style={{width:"90%"}}>
            <button className="btn btn-success" type="submit">
              Create
            </button>
          </div>
    </form>
    
    </div>
    </div>
  );
};