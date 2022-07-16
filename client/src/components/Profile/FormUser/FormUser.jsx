import React, { useState } from "react";
import styles from "./FormUser.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUserById, putUsers } from "../../../redux/actions/index";
import back from "../../../img/back.png";

export function validate(input) {
  let error = {};

  if (!input.dni) {
    error.dni = "DNI is required";
  } else if (input.dni.length > 10) {
    error.dni = "Enter less than 10 numbers";
  } else if (!/^\d{1,10}$/.test(input.dni) && input.dni) {
    error.dni = "Enter a number";
  }

  if (!input.name) {
    error.name = "Name is required";
  } else if (input.name.length > 255) {
    error.name = "Enter less than 255 characters";
  } else if (input.name.search("[0-9]") !== -1) {
    error.name = "The name must not have numbers";
  }

  if (!input.last_name) {
    error.last_name = "Last name is required";
  } else if (input.last_name.length > 255) {
    error.last_name = "Enter less than 255 characters";
  } else if (input.last_name.search("[0-9]") !== -1) {
    error.name = "The last name must not have numbers";
  }

  if (!input.e_mail) {
    error.e_mail = "E-mail is required";
  } else if (
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(input.e_mail) &&
    input.e_mail
  ) {
    error.e_mail = "Invalid e-mail format";
  }

  if (!input.phone) {
    error.phone = "Phone is required";
  } else if (input.phone.length > 10) {
    error.phone = "Enter less than 10 numbers";
  } else if (!/^\d{1,10}$/.test(input.phone) && input.phone) {
    error.phone = "Enter a number";
  }

  if (!input.num_contact) {
    error.num_contact = "Emergency contact is required";
  } else if (input.num_contact.length > 10) {
    error.num_contact = "Enter less than 10 numbers";
  } else if (!/^\d{1,10}$/.test(input.num_contact) && input.num_contact) {
    error.num_contact = "Enter a number";
  }

  if (!input.picture) {
    error.picture = "Picture is required";
  } else if (!/.(gif|jpeg|jpg|png)$/i.test(input.picture) && input.picture) {
    error.picture = "Should be a valid format (gif,jpeg,jpg,png)";
  }

  if (input.gender.length === 0 && input.gender === "") {
    error.gender = "Gender is required";
  }
  return error;
}

export const FormUser = ({
  dni,
  name,
  last_name,
  is_admin,
  e_mail,
  picture,
  gender,
  phone,
  num_contact,
  setShowEdit,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const noError = "Looks good";

  const [input, setInput] = useState({
    dni: dni,
    name: name,
    last_name: last_name,
    is_admin: is_admin,
    e_mail: e_mail,
    phone: phone,
    num_contact: num_contact,
    picture: picture,
    gender: gender,
  });

  const [error, setError] = useState({
    dni: "",
    name: "",
    last_name: "",
    e_mail: "",
    phone: "",
    num_contact: "",
    picture: "",
    gender: "",
  });

  function handleInputChange(e) {
    e.preventDefault();
    if (e.target.type === "tel") {
      setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10) });
    }
    if (e.target.type === "text" || e.target.type === "email") {
      setInput((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.toLowerCase(),
      }));
    }
    setInput({ ...input, [e.target.name]: e.target.value });

    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putUsers(dni, input));
    dispatch(getUserById(dni));
    alert("Changes saved!");
    history.push(`/Profile/${dni}`);
    setShowEdit(true);
  }

  function handleClick(e) {
    e.preventDefault();
    setShowEdit(true);
  }

  return (
    <React.Fragment>
      <div className={styles.containerBox}>
        <div className={styles.titleBox}>
          <img
            src={back}
            alt="buttonBack"
            className={styles.buttonBack}
            onClick={(e) => handleClick(e)}
          />
          <h1 className={styles.title}>Edit your profile</h1>
        </div>
        <div className={styles.editBox}>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder=""
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.name
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.name ? (
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
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="text"
                  value={input.last_name}
                  name="last_name"
                  placeholder="Write a last name..."
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.last_name
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.last_name ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.last_name}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">Last Name</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={input.dni}
                  name="dni"
                  placeholder="DNI..."
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.dni
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.dni ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.dni}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">DNI</label>
              </div>
              <div className="form-floating col-md">
                <select
                  className={
                    error.gender
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  name="gender"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Choose a gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                {error.gender ? (
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
                )}
                <label htmlFor="floatingSelect">Gender</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="email"
                  value={input.e_mail}
                  name="e_mail"
                  placeholder="E-mail..."
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.e_mail
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.e_mail ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.e_mail}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">E-mail</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="tel"
                  value={input.phone}
                  name="phone"
                  placeholder="Phone..."
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.phone
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.phone ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.phone}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">Phone</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="tel"
                  value={input.num_contact}
                  name="num_contact"
                  placeholder="Emergency contact number..."
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.num_contact
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.num_contact ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.num_contact}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">Emergency contact number</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="text"
                  value={input.picture}
                  name="picture"
                  placeholder="Paste an image link..."
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.picture
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.picture ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.picture}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">Paste an image link...</label>
              </div>
            </div>
            <div className="d-grid gap-2">
              {Object.keys(error).length > 0 ? (
                <button
                  className="btn btn-secondary"
                  style={{ backgroundColor: "#A7D129" }}
                  type="submit"
                  disabled
                >
                  Confirm changes
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  style={{ backgroundColor: "#A7D129" }}
                  type="submit"
                >
                  Confirm changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
