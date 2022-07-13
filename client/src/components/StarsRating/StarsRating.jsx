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
    e.preventDefault();
    setScore({ ...score, [scoreName]: e.target.value });

    let objError = validate({ ...score, [scoreName]: e.target.value });
    setError(objError);
  };

  return (
    <div className="container">
      <div className="stars">
        <div className="">
          <label className="StarLabel">
            <input
              className="StarInput"
              type="radio"
              value={1}
              checked={score[scoreName] === 1}
              onChange={(e) => handleRadioChangeStar(e)}
            />
            ★
          </label>
        </div>

        <div className="">
          <label className="StarLabel">
            <input
              className="StarInput"
              type="radio"
              value={2}
              checked={score[scoreName] === 2}
              onChange={(e) => handleRadioChangeStar(e)}
            />
            ★
          </label>
        </div>

        <div className="">
          <label className="StarLabel">
            <input
              className="StarInput"
              type="radio"
              value={3}
              checked={score[scoreName] === 3}
              onChange={(e) => handleRadioChangeStar(e)}
            />
            ★
          </label>
        </div>

        <div className="">
          <label className="StarLabel">
            <input
              className="StarInput"
              type="radio"
              value={4}
              checked={score[scoreName] === 4}
              onChange={(e) => handleRadioChangeStar(e)}
            />
            ★
          </label>
        </div>

        <div className="">
          <label className="StarLabel">
            <input
              className="StarInput"
              type="radio"
              value={5}
              checked={score[scoreName] === 5}
              onChange={(e) => handleRadioChangeStar(e)}
            />
            ★
          </label>
        </div>
      </div>
      <div>{`Score ${[scoreName]}: ${score[scoreName]}`}</div>
    </div>
  );
};
