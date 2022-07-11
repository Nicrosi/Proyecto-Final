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
    alert("successfully created videogame");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>previous_tournaments</label>
      <StarsRating
        score={score}
        setScore={setScore}
        scoreName={"previous_tournaments"}
      />
      <label>hit_knowledge</label>
      <StarsRating
        score={score}
        setScore={setScore}
        scoreName={"hit_knowledge"}
      />
      <label>other_strokes</label>
      <StarsRating
        score={score}
        setScore={setScore}
        scoreName={"other_strokes"}
      />
      <label>special_hits</label>
      <StarsRating
        score={score}
        setScore={setScore}
        scoreName={"special_hits"}
      />
      <label>kick_serve_control</label>
      <StarsRating
        score={score}
        setScore={setScore}
        scoreName={"kick_serve_control"}
      />
      <label>game_strategy</label>
      <StarsRating
        score={score}
        setScore={setScore}
        scoreName={"game_strategy"}
      />
      <button className="btn btn-success" type="submit">
        Create
      </button>
    </form>
  );
};
