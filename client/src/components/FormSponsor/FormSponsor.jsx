import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postSponsor } from "../../redux/actions";
import styles from "./FormSponsor.module.css";

export function validate(input) {
  let error = {};
  if (!input.company) {
    error.company = "Name is required";
  } else if (input.company.length > 255) {
    error.company = "Enter less than 255 characters";
  }

  if (!input.message) {
    error.message = "message is required";
  } else if (input.message.length > 255) {
    error.message = "Enter less than 255 characters";
  }

  if (!input.logo) {
    error.logo = "logo is required";
  } else if (!/.(gif|jpeg|jpg|png)$/i.test(input.logo) && input.logo) {
    error.logo = "Enter a correct image format (gif,jpeg,jpg,png)";
  }

  if (!input.link) {
    error.link = "link is required";
  } else if (input.link.length > 255) {
    error.link = "Enter less than 255 characters";
  }
  return error;
}

export const FormSponsor = () => {
  const dispatch = useDispatch();
  const noError = "Looks good"

  const [input, setInput] = useState({
    company: "",
    message: "",
    logo: "",
    link: "",
  });

  const [error, setError] = useState({
    company: "company is required",
    message: "message is required",
    logo: "logo is required",
    link: "link is required",
  });

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    dispatch(postSponsor(input));
    setInput({
      company: "",
      message: "",
      logo: "",
      link: "",
    });
    return alert("Sponsor created successfully");
  }

  return (
    <>
      <div className={styles.mainContainerCreation}>
        Sponsor Creation
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className={styles.formContainer}>
            <div className={styles.Section}>
              <label>Company</label>
              <input
                key="company"
                type="text"
                onChange={(e) => handleOnChange(e)}
                placeholder="Name is required"
                name="company"
                value={input.name}
                className={error.company?"form-control is-invalid":"form-control is-valid"}
                required
              />
              {error.company ?
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {error.company}
                </div>:
                <div id="validationServerUsernameFeedback" className="valid-feedback">
                {noError}
                </div>
              }      
              <label>Message</label>
              <input
                key="message"
                type="text"
                onChange={(e) => handleOnChange(e)}
                placeholder="Message is required"
                name="message"
                value={input.message}
                className={error.message?"form-control is-invalid":"form-control is-valid"}
                required
              />
              {error.message ?
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {error.message}
                </div>:
                <div id="validationServerUsernameFeedback" className="valid-feedback">
                {noError}
                </div>
              }
              <label>Logo</label>
              <input
                key="logo"
                type="url"
                onChange={(e) => handleOnChange(e)}
                placeholder="http://image.com required"
                name="logo"
                value={input.logo}
                className={error.logo?"form-control is-invalid":"form-control is-valid"}
                required
              />
              {error.logo ?
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {error.logo}
                </div>:
                <div id="validationServerUsernameFeedback" className="valid-feedback">
                {noError}
                </div>
              }
              <label>link</label>
              <input
                key="link"
                type="url"
                onChange={(e) => handleOnChange(e)}
                placeholder="http://company.com required"
                name="link"
                value={input.link}
                className={error.link?"form-control is-invalid":"form-control is-valid"}
                required
              />
              {error.link ?
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {error.link}
                </div>:
                <div id="validationServerUsernameFeedback" className="valid-feedback">
                {noError}
                </div>
              }
              <div>

              {Object.keys(error).length > 0 ? (
              <button className="btn btn-secondary" style={{ backgroundColor: "#A7D129" }} type="submit" disabled>
                Create
              </button>
            ) : (
              <button className="btn btn-success" style={{ backgroundColor: "#A7D129" }} type="submit">Create</button>
            )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
