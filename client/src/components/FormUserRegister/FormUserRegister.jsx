import React, { useState } from "react";
//import styles from "./FormUser.module.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postNewUser } from "../../redux/actions/authorization";
import img1 from "../../img/imgForm1.webp";

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
  }

  if (!input.last_name) {
    error.last_name = "Last name is required";
  } else if (input.last_name.length > 255) {
    error.last_name = "Enter less than 255 characters";
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

  if (!input.password) {
    error.password = "Password is required";
  }else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(input.password) && input.password) {
    error.password = "Minimum eight characters, at least one letter and one number";
  }

  if (!input.password2) {
    error.password2 = "Repeat password is required";
  } else if (input.password2 !== input.password) {
    error.password2 = "Passwords doesnt match";
  }

  return error;
}

export const FormUserRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const noError = "Looks good";
  const [input, setInput] = useState({
    dni: "",
    name: "",
    last_name: "",
    is_admin: false,
    num_contact: "",
    picture: "",
    gender: "",
    phone: "",
    e_mail: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState({
    dni: "DNI is required",
    name: "Name is required",
    last_name: "Last name is required",
    e_mail: "E-mail is required",
    phone: "Phone is required",
    num_contact: "Emergency contact is required",
    picture: "Picture is required",
    gender: "Gender is required",
    password: "Password is required",
    password2: "Repeat password is required",
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

    dispatch(postNewUser(input)); //auth register
    setInput({
      dni: "",
      name: "",
      last_name: "",
      is_admin: false,
      e_mail: "",
      phone: "",
      num_contact: "",
      picture: "",
      gender: "",
      password: "",
      password2: "",
    });
    alert("Created user");
    history.push("/HomeAdmin");
  }

  return (
    <React.Fragment>
      {/* font-family: 'Bebas Neue', cursive;
font-family: 'Gruppo', cursive; */}

      <div style={{ minHeight: "100vh", width: "100%" }}>
        <div style={{ position: "absolute", top: "0", width: "100%" }}>
          <img
            src={img1}
            alt="imgNotFound"
            style={{
              width: "100%",
              filter: "contrast(175%) grayscale(100%) brightness(20%)",
              objectFit: "cover",
              height: "500px",
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "7rem",
            position: "absolute",
            top: "150px",
            marginLeft: "10%",
            color: "#A7D129",
          }}
        >
          Personal Information
        </h1>

        <div
          className="mx-auto"
          style={{
            position: "relative",
            marginTop: "300px",
            width: "60%",
            backgroundColor: "rgb(43, 43, 44)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Write a name..."
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
                <label htmlFor="floatingInput">Write a name...</label>
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
                <label htmlFor="floatingInput">Write a last name...</label>
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
            <div className="row g-2 mb-3">
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
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="password"
                  value={input.password}
                  name="password"
                  placeholder="Inser yor password..."
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.password
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.password ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.password}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">Insert your password</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="password"
                  value={input.password2}
                  name="password2"
                  placeholder="Repeat your password"
                  id="floatingInput"
                  onChange={(e) => handleInputChange(e)}
                  className={
                    error.password2
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                  }
                />
                {error.password2 ? (
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    {error.password2}
                  </div>
                ) : (
                  <div
                    id="validationServerUsernameFeedback"
                    className="valid-feedback"
                  >
                    {noError}
                  </div>
                )}
                <label htmlFor="floatingInput">Repeat your password</label>
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
    </React.Fragment>
  );
};
