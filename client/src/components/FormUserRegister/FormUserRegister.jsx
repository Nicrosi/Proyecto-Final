import React, { useState } from "react";
import styles from "./FormUserRegister.module.css";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewUser } from "../../redux/actions/authorization";
import img1 from "../../img/imgForm1.webp";
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";

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

  // if (!input.picture) {
  //   error.picture = "Picture is required";
  // } else if (!/.(gif|jpeg|jpg|png)$/i.test(input.picture) && input.picture) {
  //   error.picture = "Should be a valid format (gif,jpeg,jpg,png)";
  // }

  if (input.gender.length === 0 && input.gender === "") {
    error.gender = "Gender is required";
  }

  if (!input.password) {
    error.password = "Password is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(input.password) &&
    input.password
  ) {
    error.password =
      "Minimum eight characters, at least one letter and one number";
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
  const auth = useSelector((state) => state.auth);
  const [UserImage, setUserImage] = useState(null);
  const [input, setInput] = useState({
    dni: "",
    name: "",
    last_name: "",
    is_admin: false,
    num_contact: "",
    gender: "",
    phone: "",
    e_mail: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState({
    dni: "init",
    name: "init",
    last_name: "init",
    e_mail: "init",
    phone: "init",
    num_contact: "init",
    gender: "init",
    password: "init",
    password2: "init",
  });

  function handleInputChange(e) {
    e.preventDefault();
    if (e.target.type === "file") {
      setUserImage(e.target.files[0])
    }
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

    const formData = new FormData();
    formData.append('image', UserImage);
    const User = {
      userInfo: input,
      userImage: formData
    }

    dispatch(postNewUser(User)); //auth register
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
    Swal.fire({
      title: 'Success',
      text: "User Created",
      icon: 'succces',
      showCancelButton: false,
      confirmButtonColor: '#A7D129',
      cancelButtonColor: 'rgb(43, 43, 44);',
      confirmButtonText: 'Greate'
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/HomeAdmin");
      }
    })
  }

  return (
    <React.Fragment>
      {auth.loggedIn ? (
        <Redirect to={`/Profile/${auth.currentUser.dni}`} />
      ) : (
        <div className={styles.containerBox}>
          <div className={styles.titleBox}>
            <h1 className={styles.title}>Personal Information</h1>
          </div>

          <div className={styles.formBox}>
            <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
              <div className="row g-2 mb-2">
             
                <div className="form-floating col-md">
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    placeholder="Write a name..."
                    id="floatingInput"
                    onChange={(e) => handleInputChange(e)}
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
                      error.last_name === "init"
                        ? "form-control"
                        : error.last_name
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                  />
                  {error.last_name === "init" ? (
                    <br />
                  ) : error.last_name ? (
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
                      error.dni === "init"
                        ? "form-control"
                        : error.dni
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                  />
                  {error.dni === "init" ? (
                    <br />
                  ) : error.dni ? (
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
                    onChange={(e) => handleInputChange(e)}
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
                  <input
                    type="tel"
                    value={input.phone}
                    name="phone"
                    placeholder="Phone..."
                    id="floatingInput"
                    onChange={(e) => handleInputChange(e)}
                    className={
                      error.phone === "init"
                        ? "form-control"
                        : error.phone
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                  />
                  {error.phone === "init" ? (
                    <br />
                  ) : error.phone ? (
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
                    type="tel"
                    value={input.num_contact}
                    name="num_contact"
                    placeholder="Emergency contact number..."
                    id="floatingInput"
                    onChange={(e) => handleInputChange(e)}
                    className={
                      error.num_contact === "init"
                        ? "form-control"
                        : error.num_contact
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                  />
                  {error.num_contact === "init" ? (
                    <br />
                  ) : error.num_contact ? (
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
              
              </div>
              <div className="row g-2 mb-2">
                <div className="form-floating col-md" >             
                 <Form.Group controlId="formFileLg">
                  <h5
                    className="modal-title"
                    id="staticBackdropLabel"
                    style={{ color: "#bebebe", fontSize: "1rem" }}
                  >
                    Profile Image
                  </h5>
                  <Form.Control
                    type="file"
                    size="1g"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Form.Group>
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
                      error.e_mail === "init"
                        ? "form-control"
                        : error.e_mail
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                  />
                  {error.e_mail === "init" ? (
                    <br />
                  ) : error.e_mail ? (
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
              <div className="row g-2 mb-2">
             
                <div className="form-floating col-md">
                  <input
                    type="password"
                    value={input.password}
                    name="password"
                    placeholder="Inser yor password..."
                    id="floatingInput"
                    onChange={(e) => handleInputChange(e)}
                    className={
                      error.password === "init"
                        ? "form-control"
                        : error.password
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                  />
                  {error.password === "init" ? (
                    <br />
                  ) : error.password ? (
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
                      error.password2 === "init"
                        ? "form-control"
                        : error.password2
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                    }
                  />
                  {error.password2 === "init" ? (
                    <br />
                  ) : error.password2 ? (
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
              <div className="row g-2 mb-2">
             
               
                <div className="form-floating col-md">         
                {Object.keys(error).length > 0 || !UserImage ? (
                  <button
                    className="btn btn-secondary"
                    style={{ backgroundColor: "#A7D129", width: "100%", }}
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
      )}
    </React.Fragment>
  );
};
