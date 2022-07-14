import React from "react";
import "./StarsRating.css";

export function validate(input) {
  let error = {};
  if (!input.previous_tournaments) {
    error.previous_tournaments = "previous_tournaments is required";
  }
  if (!input.hit_knowledge) {
    error.hit_knowledge = "hit_knowledge is required";
  }
  if (!input.other_strokes) {
    error.other_strokes = "other_strokes is required";
  }
  if (!input.special_hits) {
    error.special_hits = "special_hits is required";
  }
  if (!input.kick_serve_control) {
    error.kick_serve_control = "kick_serve_control is required";
  }
  if (!input.game_strategy) {
    error.game_strategy = "game_strategy is required";
  }
  return error;
}

export const StarsRating = ({ score, setScore, scoreName, setError }) => {
  const handleRadioChangeStar = function (e) {
   
    setScore({ ...score, [scoreName]: e.target.value });

    let objError = validate({ ...score, [scoreName]: e.target.value });
    setError(objError);
  };

  return (
    <div className="container">
      <div className="stars">
        <input
          id={`radio5${scoreName}`}
          className="StarInput"
          type="radio"
          name={scoreName}
          value={5}
          onChange={(e) => handleRadioChangeStar(e)}
        />
        <label htmlFor={`radio5${scoreName}`} className="StarLabel">
          ★
        </label>
        <input
          id={`radio4${scoreName}`}
          className="StarInput"
          type="radio"
          name={scoreName}
          value={4}
          onChange={(e) => handleRadioChangeStar(e)}
        />
        <label htmlFor={`radio4${scoreName}`} className="StarLabel">
          ★
        </label>
        <input
          id={`radio3${scoreName}`}
          className="StarInput"
          type="radio"
          name={scoreName}
          value={3}
          onChange={(e) => handleRadioChangeStar(e)}
        />
        <label htmlFor={`radio3${scoreName}`} className="StarLabel">
          ★
        </label>
        <input
          id={`radio2${scoreName}`}
          className="StarInput"
          type="radio"
          name={scoreName}
          value={2}
          onChange={(e) => handleRadioChangeStar(e)}
        />
        <label htmlFor={`radio2${scoreName}`} className="StarLabel">
          ★
        </label>
        <input
          id={`radio1${scoreName}`}
          className="StarInput"
          type="radio"
          name={scoreName}
          value={1}
          onChange={(e) => handleRadioChangeStar(e)}
        />
        <label htmlFor={`radio1${scoreName}`} className="StarLabel">
          ★
        </label>
      </div>
      <div>{`Score ${[scoreName]}: ${score[scoreName]}`}</div>
    </div>
  );
};
