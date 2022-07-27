import React, { useEffect, useState } from "react";
import Reacket from "reacket";
import { addNextRound, getBracket, putScore } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const finalRound = (brackets) => {
  const numPlayers =
    brackets.filter((bracket) => bracket.round.round_numb === 1).length * 2;
  console.log(numPlayers);
  const currentRound = brackets[brackets.length - 1].round.round_numb;
  const maxRounds = Math.log2(numPlayers);
  if (currentRound === maxRounds) {
    return true;
  } else {
    return false;
  }
};

const Brackets = () => {
  const [form, setForm] = useState({
    id_match: 0,
    score1: 0,
    score2: 0,
    score3: 0,
    score21: 0,
    score22: 0,
    score23: 0,
  });
  const { subt_id } = useParams();
  const brackets = useSelector((state) => state.rootReducer.matches);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const parseMatches = brackets.map((match, index) => {
    const arrScore = JSON.parse(match.score);
    return {
      id: Number(match.id_match),
      match: index,
      round: match.round.round_numb,
      score: [arrScore[0].join("-"), arrScore[1].join("-")],
      players: [
        {
          id: Number(match.teams[0].id_team),
          name: match.teams[0].users[0].name,
          seed: Number(match.teams[0].id_team),
        },
        {
          id: Number(match.teams[1].id_team),
          name: match.teams[1].users[0].name,
          seed: Number(match.teams[1].id_team),
        },
      ],
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBracket(subt_id));
    // return dispatch(clearBracket())
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //"[[0,0,0],[0,0,0]]"
    e.preventDefault();
    const score = [[], []];
    score[0].push(Number(form.score1));
    score[0].push(Number(form.score2));
    score[0].push(Number(form.score3));
    score[1].push(Number(form.score21));
    score[1].push(Number(form.score22));
    score[1].push(Number(form.score23));
    dispatch(putScore(form.id_match, JSON.stringify(score)));
  };

  const handleNextRound = async (e) => {
    //Ganadores
    const round = brackets[brackets.length - 1].round.round_numb;
    const winners = [];
    for (let j = 0; j < brackets.length; j++) {
      let team1 = 0;
      let team2 = 0;
      for (let i = 0; i < 3; i++) {
        if (parseMatches[j].score[0][i] > parseMatches[j].score[1][i]) {
          team1++;
        } else {
          team2++;
        }
      }
      if (team1 > team2) {
        winners.push(brackets[j].teams[0].id_team);
      } else {
        winners.push(brackets[j].teams[1].id_team);
      }
    }
    finalRound(brackets)
      ? Swal.fire({
          title: `THE WINNER IS ${winners[0]}!!`,
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
        rgba(0,0,123,0.4)
        url("https://media0.giphy.com/media/o9KykZbrhepqKjqXxe/giphy.gif")
        center top
        no-repeat
      `,
        })
      : dispatch(addNextRound(subt_id, round + 1, winners));
  };

  return (
    <>
      <Reacket matches={parseMatches} />
      {currentUser.is_admin ? (
        <>
          {" "}
          <form onSubmit={handleSubmit}>
            <label htmlFor="">id_match:</label>
            <input
              type="number"
              name="id_match"
              id=""
              value={form.id_match}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="">score-player 1:</label>
            <input
              type="number"
              name="score1"
              id="score1"
              onChange={handleChange}
              value={form.score1}
            />
            <input
              type="number"
              name="score2"
              id="score2"
              onChange={handleChange}
              value={form.score2}
            />
            <input
              type="number"
              name="score3"
              id="score3"
              onChange={handleChange}
              value={form.score3}
            />
            <br />
            <label htmlFor="">score-player 2:</label>
            <input
              type="number"
              name="score21"
              id="score21"
              onChange={handleChange}
              value={form.score21}
            />
            <input
              type="number"
              name="score22"
              id="score22"
              onChange={handleChange}
              value={form.score22}
            />
            <input
              type="number"
              name="score23"
              id="score23"
              onChange={handleChange}
              value={form.score23}
            />
            <br />
            <input type="submit" value="Save" />
            
              <button onClick={handleNextRound}>Next Round</button>
           
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Brackets;

/* const brackets = [
  {
    id: 1,
    round: 1,
    players: [
      {
        id: 1,
        name: "Mr. Orange",
      },
      {
        id: 2,
        name: "Mr. White",
      },
    ],
    score: "["6 - 4 - 4", "1 - 6 - 6"]",
  },
]; */

// id_match, score
