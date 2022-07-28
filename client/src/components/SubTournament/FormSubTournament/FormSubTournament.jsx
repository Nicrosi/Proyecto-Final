import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postSubTournament } from "../../../redux/actions/index";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import styles from "./FormSubTournament.module.css";
import home from "../../../img/homeAdmin.png";



export function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name is required";
  } else if (input.name.length > 255) {
    error.name = "Enter less than 255 characters";
  }

  if (!input.numb_players) {
    error.numb_players = "Numb players is required";
  } else if (Number(input.numb_players) % 2 === 1) {
    error.numb_players = "only pairs";
  } else if (input.numb_players > 16 || input.numb_players < 4) {
    error.numb_players = "Enter less than 16 players and more than 4";
  }
  if (!input.price) {
    error.price = "Price is required";
  }

  if (input.gender.length === 0 && input.gender === "") {
    error.gender = "Gender is required";
  }

  if (input.match_type.length === 0 && input.match_type === "") {
    error.match_type = "Match type is required";
  }

  if (input.elimination_type.length === 0 && input.elimination_type === "") {
    error.elimination_type = "Elimination type is required";
  }

  if (input.id_category.length === 0 && input.id_category === "") {
    error.id_category = "Category type is required";
  }
  return error;
}

const initialInput = {
  elimination_type: "",
  match_type: "",
  name: "",
  numb_players: "",
  gender: "",
  price: "",
  id_category: "",
}

const initialErrors = {
  elimination_type: "init",
  match_type: "init",
  name: "init",
  numb_players: "init",
  gender: "init",
  price: "init",
  id_category: "init",
}

export const FormSubTournament = (props) => {
  const params = Number(props.match.params.tournamentId);
  const noError = "Looks good";
  const dispatch = useDispatch();
  const History = useHistory();

  const [input, setInput] = useState(initialInput);

  const [error, setError] = useState(initialErrors);

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    dispatch(postSubTournament(params, input));
    setInput({
      elimination_type: "",
      match_type: "",
      name: "",
      numb_players: "",
      gender: "",
      price: "",
      id_category: "",
    });
    Swal.fire({
      title: 'Success',
      text: "Subtournament created successfully",
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#A7D129',
      cancelButtonColor: '#A7D129',
      confirmButtonText: ' Okey '
    }).then((result) => {
      if (result.isConfirmed) {
        History.push('/HomeAdmin')
      }
    })
    setError(initialErrors)
    setInput(initialInput);
    e.target.reset()
  }

  return (
    <>
      <div className={styles.containerBox}>
        <div className={styles.titleBox}>
          <Link to="/HomeAdmin">
            <img
              src={home}
              alt="homeAdmin"
              className={styles.buttonHome}
            />
          </Link>
          <h1 className={styles.title}>SUBTOURNAMENT CREATION</h1>
        </div>
          <div className={styles.formBox}>

              <form style={{ width: "100%" }} onSubmit={(e) => handleOnSubmit(e)}>
                <div className="row g-2 mb-3">
                  <div className="form-floating col-md">
                    <input
                      key="name"
                      type="text"
                      onChange={(e) => handleOnChange(e)}
                      placeholder="Name is required"
                      id="floatingInputName"
                      name="name"
                      value={input.name}
                      className={
                        error.name === "init"
                          ? "form-control"
                          : error.name
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                      }
                      required
                    />
                    {error.name === "init" ? (
                      <br />
                    ) : error.name ? (
                      <div
                        id="validationServerUsernameFeedback"
                        className="invalid-feedback"
                      >
                        {error.name}
                      </div>
                    ) : (
                      <div
                        id="validationServerUsernameFeedback"
                        className="valid-feedback"
                      >
                        {noError}
                      </div>
                    )}
                    <label htmlFor="floatingInputName">Name</label>
                  </div>
                  <div className="form-floating col-md">
                    <input
                      key="numb_players"
                      type="number"
                      min="4"
                      max="16"
                      onChange={(e) => handleOnChange(e)}
                      placeholder="Number players required"
                      id="floatingInput"
                      name="numb_players"
                      value={input.numb_players}
                      className={
                        error.numb_players === "init"
                          ? "form-control"
                          : error.numb_players
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                      }
                      required
                    />
                    {error.numb_players === "init" ? (
                      <br />
                    ) : error.numb_players ? (
                      <div
                        id="validationServerUsernameFeedback"
                        className="invalid-feedback"
                      >
                        {error.numb_players}
                      </div>
                    ) : (
                      <div
                        id="validationServerUsernameFeedback"
                        className="valid-feedback"
                      >
                        {noError}
                      </div>
                    )}
                    <label htmlFor="floatingInput">Number of players</label>
                  </div>
                  <div className="form-floating col-md">
                    <input
                      key="price"
                      type="number"
                      onChange={(e) => handleOnChange(e)}
                      placeholder="Price is required"
                      id="floatingInput"
                      name="price"
                      value={input.price}
                      className={
                        error.price === "init"
                          ? "form-control"
                          : error.price
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                      }
                      required
                    />
                    {error.price === "init" ? (
                      <br />
                    ) : error.price ? (
                      <div
                        id="validationServerUsernameFeedback"
                        className="invalid-feedback"
                      >
                        {error.price}
                      </div>
                    ) : (
                      <div
                        id="validationServerUsernameFeedback"
                        className="valid-feedback"
                      >
                        {noError}
                      </div>
                    )}
                    <label>Price</label>
                  </div>
                </div>

                <div className="row g-2 mb-2">

                <div className="form-floating col-md">
                  <select
                    className={
                      error.gender === "init"
                        ? "form-control"
                        : error.gender
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="gender"
                    onChange={(e) => handleOnChange(e)}
                  >
                    <option value="">Choose a gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  {error.gender === "init" ? <br /> : (error.gender ? (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      {error.gender}
                    </div>
                  ) : (
                    <div
                      id="validationServerUsernameFeedback"
                      className="valid-feedback"
                    >
                      {noError}
                    </div>
                  ))}
                  <label htmlFor="floatingSelect">Gender</label>
                </div>
                <div className="form-floating col-md">
                  <select
                    className={
                      error.id_category === "init"
                        ? "form-control"
                        : error.id_category
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="id_category"
                    onChange={(e) => handleOnChange(e)}
                  >
                    <option value="">Choose a Category</option>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">E</option>
                  </select>
                  {error.id_category === "init" ? <br /> : (error.id_category ? (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      {error.id_category}
                    </div>
                  ) : (
                    <div
                      id="validationServerUsernameFeedback"
                      className="valid-feedback"
                    >
                      {noError}
                    </div>
                  ))}
                  <label htmlFor="floatingSelect">id_category</label>
                </div>
                </div>
                <div className="row g-2 mb-2">

                <div className="form-floating col-md">
                  <select
                    className={
                      error.elimination_type === "init"
                        ? "form-control"
                        : error.elimination_type
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="elimination_type"
                    onChange={(e) => handleOnChange(e)}
                  >
                    <option value="">Choose a elimination type</option>
                    <option value="All" disabled>All vs All</option>
                    <option value="Simple">Simple Elimination</option>
                    <option value="Double" disabled>Double Elimination</option>
                  </select>
                  {error.elimination_type === "init" ? <br /> : (error.elimination_type ? (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      {error.elimination_type}
                    </div>
                  ) : (
                    <div
                      id="validationServerUsernameFeedback"
                      className="valid-feedback"
                    >
                      {noError}
                    </div>
                  ))}
                  <label htmlFor="floatingSelect">elimination_type</label>
                </div>
                <div className="form-floating col-md">
                  <select
                    className={
                      error.match_type === "init"
                        ? "form-control"
                        : error.match_type
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="match_type"
                    onChange={(e) => handleOnChange(e)}
                  >
                    <option value="">Choose a match type</option>
                    <option value="singles">singles</option>
                    <option value="dobles" disabled>dobles</option>
                  </select>
                  {error.match_type === "init" ? <br /> : (error.match_type ? (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      {error.match_type}
                    </div>
                  ) : (
                    <div
                      id="validationServerUsernameFeedback"
                      className="valid-feedback"
                    >
                      {noError}
                    </div>
                  ))}
                  <label htmlFor="floatingSelect">match_type</label>
                </div>
              </div>

                <div className="row g-2 mb-2">
                  <div>
                    {Object.keys(error).length > 0 ? (
                      <button
                        className="btn btn-secondary"
                        style={{ backgroundColor: "#A7D129", width: "100%" }}
                        type="submit"
                        disabled
                      >
                        Create
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        style={{ backgroundColor: "#A7D129", width: "100%" }}
                        type="submit"
                      >
                        Create
                      </button>
                    )}
                  </div>
                </div>
              </form>
   
          </div>
      </div>
    </>
  );
};
