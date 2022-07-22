import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postLogin, urlAuth } from "../../redux/actions/authorization";
import img from "../../img/google-icon.png";
import styles from "./LogIn.module.css";

export default function LogIn() {
  const dispatch = useDispatch();
  const { loggedIn, currentUser } = useSelector((state) => state.auth);
  const [Errors, setErrors] = useState([]);
  const [Success, setSuccess] = useState([]);
  const [input, setInput] = useState({
    e_mail: "",
    password: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      if (currentUser.is_admin) history.push("/HomeAdmin");
      else {
        history.push("/profile/" + currentUser.dni);
      }
    }
  }, [loggedIn, currentUser, history]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validateError({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    setSuccess(
      validateSucces({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postLogin(input)); //auth login
    setInput({
      e_mail: "",
      password: "",
    });
    setSuccess([]);
  };

  const logGoogle = (e) => {
    window.open(urlAuth + "/login/google");
  };

  return (
    <div className={styles.logContainer}>
      <h1 className={styles.title}>LogIn</h1>
      <div className={styles.loginContainer}>
        <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
          <div className="row g-2 mb-3">
            <div className="form-floating col-md">
              <input
                type="text"
                value={input.e_mail}
                name="e_mail"
                placeholder="Write your Email..."
                id="floatingInput1"
                onChange={(e) => handleInputChange(e)}
                className={
                  Errors.e_mail
                    ? "form-control is-invalid"
                    : Success.e_mail
                    ? "form-control is-valid"
                    : "form-control"
                }
              />
              {Errors.e_mail ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {Errors.e_mail}
                </div>
              ) : (
                <div
                  id="validationServerUsernameFeedback"
                  className="valid-feedback"
                ></div>
              )}
              <label htmlFor="floatingInput1">Write your email...</label>
            </div>
          </div>
          <div className="row g-2 mb-3">
            <div className="form-floating col-md">
              <input
                type="password"
                value={input.password}
                name="password"
                placeholder="Write your password..."
                id="floatingInput2"
                onChange={(e) => handleInputChange(e)}
                className={
                  Errors.password
                    ? "form-control is-invalid"
                    : Success.password
                    ? "form-control is-valid"
                    : "form-control"
                }
              />
              {Errors.password ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {Errors.password}
                </div>
              ) : (
                <div
                  id="validationServerUsernameFeedback"
                  className="valid-feedback"
                ></div>
              )}
              <label htmlFor="floatingInput2">Write your password...</label>
            </div>
          </div>
          <div className="d-grid gap-2">
            {Errors.e_mail ||
            Errors.password ||
            !input.e_mail ||
            !input.password ? (
              <button
                className="btn btn-secondary"
                style={{ backgroundColor: "#A7D129" }}
                disabled
              >
                Log in
              </button>
            ) : (
              <button className={`${styles.btnCustom} btn btn-success`}>
                Log in
              </button>
            )}
          </div>
          <hr style={{ borderColor: "white" }} />
        </form>
        <div className="d-flex justify-content-center">
          <button
            onClick={logGoogle}
            className={`${styles.btnCustom} btn btn-success`}
          >
            <img src={img} alt="" />
            Log with Google
          </button>
        </div>
      </div>
    </div>
  );
}

function validateError(input) {
  let error = {};
  if (!input.e_mail) {
    error.e_mail = "Email is required";
  } else if (
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(input.e_mail) &&
    input.e_mail
  ) {
    error.e_mail = "Invalid e-mail format";
  }

  if (!input.password) {
    error.password = "Password is required";
  }

  return error;
}

function validateSucces(input) {
  let success = {};
  if (input.e_mail && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(input.e_mail)) {
    success.e_mail = "Success";
  }

  if (input.password) {
    success.password = "Success";
  }

  return success;
}
