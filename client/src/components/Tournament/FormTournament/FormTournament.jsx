import React, { useState } from "react";
import axios from "axios";
import { ContactForm } from "../ContactForm/ContactForm";
import styles from "./FormTournament.module.css";
import home from "../../../img/homeAdmin.png";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";


export function validate(input) {
  let error = {};
  if (!input.date) {
    error.date = "Date is required";
  } else if (
    !/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(input.date) &&
    input.date
  ) {
    error.date = "Invalid date format";
  }

  if (!input.location) {
    error.location = "Location is required";
  } else if (input.location.length > 255) {
    error.location = "Enter less than 255 characters";
  }
  if (!input.name) {
    error.name = "Name is required";
  } else if (input.name.length > 255) {
    error.name = "Enter less than 255 characters";
  }

  return error;
}

const initialInput = {
  name: "",
  date: "",
  location: "",
}

export const FormTournament = () => {
  const noError = "Looks good";
  const [input, setInput] = useState(initialInput);
  const History = useHistory();

  const [error, setError] = useState({
    name: "init",
    date: "init",
    location: "init",
  });

  async function handleOnSubmit(e) {
    e.preventDefault();
    await axios.post(`http://localhost:3001/tournament`, input);
    setInput(initialInput)
    Swal.fire({
      title: 'Success',
      text: "Tournament created successfully",
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
  }

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
    console.log(e.target);
    console.log(e.target.value);
  }

  return (
    <div className={styles.containerBox}>
      <div className={styles.titleBox}>
        <Link to="/HomeAdmin">
          <img
            src={home}
            alt="homeAdmin"
            className={styles.buttonHome}
          />
        </Link>
        <h1 className={styles.title}>TOURNAMENT CREATION</h1>
      </div>
      <div className={styles.allFormsBox}>
        <div className={styles.formBox}>
          <div
            className="mx-auto hstack justify-content-around"
            style={{ width: "100%" }}
          >
            <form style={{ width: "100%" }} onSubmit={(e) => handleOnSubmit(e)}>
              <div className="hstack mb-3">
                <ul
                  className="list-group list-group-horizontal mx-auto"
                  style={{ width: "100%" }}
                >
                  <li className="list-group-item" style={{ width: "50%" }}>
                    <div>
                      <h5 className="card-text">Name</h5>
                      <input
                        key="name"
                        type="text"
                        onChange={(e) => handleOnChange(e)}
                        placeholder="Tournament name"
                        name="name"
                        value={input.name}
                        required
                        className={
                          error.name === "init"
                            ? "form-control"
                            : error.name
                              ? "form-control is-invalid"
                              : "form-control is-valid"
                        }
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
                    </div>
                  </li>
                  <li className="list-group-item" style={{ width: "50%" }}>
                    <div>
                      <h5 className="card-text">Date</h5>
                      <input
                        key="date"
                        type="date"
                        onChange={(e) => handleOnChange(e)}
                        placeholder="Tournaments Date..."
                        name="date"
                        value={input.date}
                        required
                        className={
                          error.date === "init"
                            ? "form-control"
                            : error.date
                              ? "form-control is-invalid"
                              : "form-control is-valid"
                        }
                      />
                      {error.date === "init" ? (
                        <br />
                      ) : error.date ? (
                        <div
                          id="validationServerUsernameFeedback"
                          className="invalid-feedback"
                        >
                          {error.date}
                        </div>
                      ) : (
                        <div
                          id="validationServerUsernameFeedback"
                          className="valid-feedback"
                        >
                          {noError}
                        </div>
                      )}
                    </div>
                  </li>

                  <li className="list-group-item" style={{ width: "50%" }}>
                    <div>
                      <h5 className="card-text">Location: </h5>
                      <input
                        key="Location"
                        type="text"
                        onChange={(e) => handleOnChange(e)}
                        placeholder="Tournaments location..."
                        name="location"
                        value={input.location}
                        className={
                          error.location === "init"
                            ? "form-control"
                            : error.location
                              ? "form-control is-invalid"
                              : "form-control is-valid"
                        }
                      />
                      {error.location === "init" ? (
                        <br />
                      ) : error.location ? (
                        <div
                          id="validationServerUsernameFeedback"
                          className="invalid-feedback"
                        >
                          {error.location}
                        </div>
                      ) : (
                        <div
                          id="validationServerUsernameFeedback"
                          className="valid-feedback"
                        >
                          {noError}
                        </div>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="d-grid gap-2">
                {Object.keys(error).length > 0 ? (
                  <button
                    className="btn btn-secondary"
                    style={{ backgroundColor: "#A7D129" }}
                    type="submit"
                    disabled
                  >
                    Create
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    style={{ backgroundColor: "#A7D129" }}
                    type="submit"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};
