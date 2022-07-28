import React, { useEffect, useState } from "react";
import Reacket from "reacket";
import { addNextRound, getBracket, putScore } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Brackets.module.css";
import "./reacket.theme.css";

export function validate(form) {
  let error = {};

  if (!form.id) {
    error.id = "Match is required";
  }

  if (!form.score1) {
    error.score1 = "Score is required";
  }
  if (!form.score2) {
    error.score2 = "Score is required";
  }
  if (!form.score3) {
    error.score3 = "Score is required";
  }
  if (!form.score21) {
    error.score21 = "Score is required";
  }
  if (!form.score22) {
    error.score22 = "Score is required";
  }
  if (!form.score23) {
    error.score23 = "Score is required";
  }

  if (form.score1 === form.score21) {
    error.score1 = "cant be on TIE!";
    error.score21 = "cant be on TIE!";
  }
  if (form.score2 === form.score22) {
    error.score2 = "cant be on TIE!";
    error.score22 = "cant be on TIE!";
  }
  if (form.score3 === form.score23) {
    error.score3 = "cant be on TIE!";
    error.score23 = "cant be on TIE!";
  }

  if (!/^[0-7]$/.test(form.score1) && form.score1) {
    error.score1 = "0 to 7 is valid";
  }

  if (!/^[0-7]$/.test(form.score2) && form.score2) {
    error.score2 = "0 to 7 is valid";
  }

  if (!/^[0-7]$/.test(form.score3) && form.score3) {
    error.score3 = "0 to 7 is valid";
  }

  if (!/^[0-7]$/.test(form.score21) && form.score21) {
    error.score21 = "0 to 7 is valid";
  }
  if (!/^[0-7]$/.test(form.score22) && form.score22) {
    error.score22 = "0 to 7 is valid";
  }

  if (!/^[0-7]$/.test(form.score23) && form.score23) {
    error.score23 = "0 to 7 is valid";
  }


  return error;
}

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

const rdScoreFilled = (brackets) => {
  //JSON.parse(match.score);
  for (let i = 0; i < brackets.length; i++) {
    if (brackets[i].score === "[[0,0,0],[0,0,0]]") {
      return false;
    }
  }
  return true;
};

const Brackets = () => {
  const [form, setForm] = useState({
    id: "",
    score1: "",
    score2: "",
    score3: "",
    score21: "",
    score22: "",
    score23: "",
  });

  const noError = "Looks good";
  const [error, setError] = useState({
    id: "init",
    score1: "init",
    score2: "init",
    score3: "init",
    score21: "init",
    score22: "init",
    score23: "init",
  });

  const { subt_id } = useParams();
  const brackets = useSelector((state) => state.rootReducer.matches);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBracket(subt_id));
    // return dispatch(clearBracket())
  }, [dispatch, subt_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });


    let objError = validate({ ...form, [e.target.name]: e.target.value });
    setError(objError);
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

    const findMatch = parseMatches.find(
      (match) => match.id === Number(form.id)
    );
    const id_match = findMatch.id_match;
    dispatch(putScore(id_match, JSON.stringify(score)));
  };

  const handleNextRound = async (e) => {
    //Ganadores
    const round = brackets[brackets.length - 1].round.round_numb;
    const filterBracket = parseMatches.filter((match) => match.round === round);
    const winners = [];
    const winner_name = [];
    console.log(filterBracket);
    for (let j = 0; j < filterBracket.length; j++) {
      let team1 = 0;
      let team2 = 0;
      for (let i = 0; i < 3; i++) {
        if (filterBracket[j].score[0][i] > filterBracket[j].score[1][i]) {
          team1++;
        } else {
          team2++;
        }
      }
      if (team1 > team2) {
        winners.push(filterBracket[j].teams[0].id_team);
        winner_name.push(filterBracket[j].teams[0].users[0].name);
      } else {
        winners.push(filterBracket[j].teams[1].id_team);
        winner_name.push(filterBracket[j].teams[1].users[0].name);
      }
    }
    finalRound(brackets)
      ? Swal.fire({
        title: `THE WINNER IS ${winner_name[0]}!!`,
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
      : dispatch(addNextRound(subt_id, round + 1, winners)).then(() => {
        window.location.reload();
      });
  };

  const parseMatches = brackets.map((match, index) => {
    const arrScore = JSON.parse(match.score);
    return {
      teams: match.teams,
      id_match: match.id_match,
      id: index + 1,
      match: Number(match.id_match),
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

  return (
    <div className={styles.containerBox}>
      <div className={styles.bracket}>
        <Reacket matches={parseMatches} />
      </div>
      {currentUser.is_admin ? (
        <div className={styles.formBox}>
          {" "}
          <form onSubmit={handleSubmit}>
     
           
            <div className={styles.playersBox}>
              
              <div>
              <h5 htmlFor="">Match N°</h5>
            <input
              type="number"
              name="id"
              id="id"
              min="1"
              max={brackets.length}
              value={form.id}
              required
              onChange={handleChange}
              style={{ width: "90px", height: "45px"}}

              className={
                error.id === "init"
                  ? "form-control"
                  : error.id
                    ? "form-control is-invalid"
                    : "form-control"
              }
            />
            {error.id === "init" ? (
              <br />
            ) : error.id ? (
              <div
                id="validationServerUsernameFeedback"
                className="invalid-feedback"
                style={{fontSize: "0.7rem"}}
              >
                {error.id}
              </div>
            ) : (
              <br />
            )}
              </div>


              <div className={styles.player1Box}>
                <h5 htmlFor="">Score player 1</h5>
                <ul class="list-group list-group-horizontal">
                <li class="list-group-item" style={{ width: "90px", height: "45px", padding: "0" }} >
                    <input
                      onKeyDown="return false"
                      type="number"
                      min="0"
                      max="7"
                      name="score1"
                      id="score1"
                      onChange={handleChange}
                      style={{ width: "90px", height: "45px", borderRadius: "8px 0 0 8px" }}
                      value={form.score1}
                      required
                      className={
                        error.score1 === "init"
                          ? "form-control"
                          : error.score1
                            ? "form-control is-invalid"
                            : "form-control"
                      }
                    />
                    {error.score1 === "init" ? (
                      <br />
                    ) : error.score1 ? (
                      <h5
                        id="validationServerUsernameFeedback"
                        className="invalid-feedback"
                        style={{fontSize: "0.7rem"}}
                      >
                        {error.score1}
                      </h5>
                    ) : (
                      <br />
                    )}
                  </li>
                  <li class="list-group-item" style={{ width: "90px", height: "45px", padding: "0" }} >
                    <input
                      onKeyDown="return false"
                      type="number"
                      min="0"
                      max="7"
                      name="score2"
                      id="score2"
                      onChange={handleChange}
                      style={{ width: "90px", height: "45px", borderRadius: "0" }}
                      value={form.score2}
                      required
                      className={
                        error.score2 === "init"
                          ? "form-control"
                          : error.score2
                            ? "form-control is-invalid"
                            : "form-control"
                      }
                    />
                    {error.score2 === "init" ? (
                      <br />
                    ) : error.score2 ? (
                      <div
                        id="validationServerUsernameFeedback"
                        className="invalid-feedback"
                        style={{fontSize: "0.7rem"}}
                      >
                        {error.score2}
                      </div>
                    ) : (
                      <br />
                    )}
                  </li>
                  <li class="list-group-item" style={{ width: "90px", height: "45px", padding: "0" }} >
                    <input
                      type="number"
                      min="0"
                      max="7"
                      name="score3"
                      id="score3"
                      onChange={handleChange}
                      style={{ width: "90px", height: "45px", borderRadius: "0 8px 8px 0" }}
                      value={form.score3}
                      required
                      className={
                        error.score3 === "init"
                          ? "form-control"
                          : error.score3
                            ? "form-control is-invalid"
                            : "form-control"
                      }
                    />
                    {error.score3 === "init" ? (
                      <br />
                    ) : error.score3 ? (
                      <div
                        id="validationServerUsernameFeedback"
                        className="invalid-feedback"
                        style={{fontSize: "0.7rem"}}
                      >
                        {error.score3}
                      </div>
                    ) : (
                      <br />
                    )}
                  </li>
                </ul>
              </div>
              <div className={styles.player1Box}>
                <h5 htmlFor="">Score player 2</h5>
                <ul class="list-group list-group-horizontal">
                <li class="list-group-item" style={{ width: "90px", height: "45px", padding: "0" }} >
                  <input
                    type="number"
                    min="0"
                    max="7"
                    name="score21"
                    id="score21"
                    onChange={handleChange}
                    style={{ width: "90px", height: "45px", borderRadius: "8px 0 0 8px" }}
                    value={form.score21}
                    required
                    className={
                      error.score21 === "init"
                        ? "form-control"
                        : error.score21
                          ? "form-control is-invalid"
                          : "form-control"
                    }
                  />
                  {error.score21 === "init" ? (
                    <br />
                  ) : error.score21 ? (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                      style={{fontSize: "0.7rem"}}
                    >
                      {error.score21}
                    </div>
                  ) : (
                    <br />
                  )}
                  </li>
                  <li class="list-group-item" style={{ width: "90px", height: "45px", padding: "0" }} >
                  <input
                    type="number"
                    min="0"
                    max="7"
                    name="score22"
                    id="score22"
                    onChange={handleChange}
                    style={{ width: "90px", height: "45px", borderRadius: "0" }}
                    value={form.score22}
                    required
                    className={
                      error.score22 === "init"
                        ? "form-control"
                        : error.score22
                          ? "form-control is-invalid"
                          : "form-control"
                    }
                  />
                  {error.score22 === "init" ? (
                    <br />
                  ) : error.score22 ? (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                      style={{fontSize: "0.7rem"}}
                    >
                      {error.score22}
                    </div>
                  ) : (
                    <br />
                  )}
                  </li>
                  <li class="list-group-item" style={{ width: "90px", height: "45px", padding: "0" }} >
                  <input
                    type="number"
                    min="0"
                    max="7"
                    name="score23"
                    id="score23"
                    onChange={handleChange}
                    style={{ width: "90px", height: "45px", borderRadius: "0 8px 8px 0" }}
                    value={form.score23}
                    required
                    className={
                      error.score23 === "init"
                        ? "form-control"
                        : error.score23
                          ? "form-control is-invalid"
                          : "form-control"
                    }
                  />
                  {error.score23 === "init" ? (
                    <br />
                  ) : error.score23 ? (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                      style={{fontSize: "0.7rem"}}
                    >
                      {error.score23}
                    </div>
                  ) : (
                    <br />
                  )}
                  </li>
                  </ul>
              </div>
            </div>
            <br />

           <div className={styles.buttonBox}>
            {Object.keys(error).length > 0 ? <button disabled style={{width: "90%", height: "40px", borderRadius: "8px", backgroundColor: "#A7D129", border: "none" }}>Cant Save</button> : <input type="submit" value="Save"  style={{width: "90%", height: "40px", borderRadius: "8px", backgroundColor: "#A7D129", border: "none"}} />}
            </div>
          </form>
          <div className={styles.button2Box}>
          {rdScoreFilled(brackets) ? (
            <button onClick={handleNextRound} style={{width: "90%", height: "40px", borderRadius: "8px", backgroundColor: "#A7D129", border: "none"}}>Next Round</button>
          ) : (
            <button disabled style={{width: "90%", height: "40px", borderRadius: "8px", backgroundColor: "#A7D129", border: "none"}}>Next Round</button>
          )}
          </div>
          </div>
        
      ) : (
        <></>
      )}
    </div>
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
