import React from "react";
import "./StarsRating.css";

export const StarsRating = ({ score, setScore, scoreName }) => {
  const handleRadioChangeStar = function (e) {
    e.preventDefault();
    setScore({ ...score, [scoreName]: e.target.value });
  };

  return (
    <div className="container">
      <div class="stars">
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
