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
    error.message = "Message is required";
  } else if (input.message.length > 255) {
    error.message = "Enter less than 255 characters";
  }

  if (!input.logo) {
    error.logo = "Logo is required";
  } else if (!/.(gif|jpeg|jpg|png)$/i.test(input.logo) && input.logo) {
    error.logo = "Enter a correct image format (gif,jpeg,jpg,png)";
  }

  if (!input.link) {
    error.link = "Link is required";
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
    company: "Company is required",
    message: "Message is required",
    logo: "Logo is required",
    link: "Link is required",
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
      <div className={styles.containerBox}>
        <div className={styles.imageBox}></div>
        <h1 className={styles.title}>Sponsor Creation</h1>
        <div className={styles.formBox}>
          <form style={{ width: "100%" }} onSubmit={(e) => handleOnSubmit(e)}>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  key="company"
                  type="text"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Name is required"
                  id="floatingInput"
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
                <label htmlFor="floatingInput">Company</label>      
              </div>
              <div className="form-floating col-md">
                <input
                  key="logo"
                  type="url"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="http://image.com required"
                  id="floatingInput"
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
                <label htmlFor="floatingInput">Logo</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  key="link"
                  type="url"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="http://company.com required"
                  id="floatingInput"
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
                <label>Link</label>
              </div>
            </div>
            <div className="row g-2 mb-3">  
              <div className="form-floating col-md">
                <input
                  key="message"
                  type="text"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Message is required"
                  id="floatingInput"
                  name="message"
                  value={input.message}
                  style={{height: "100px"}} 
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
                <label htmlFor="floatingInput">Message</label>
              </div>
                <div>

                {Object.keys(error).length > 0 ? (
                <button className="btn btn-secondary" style={{ backgroundColor: "#A7D129", width: "100%" }} type="submit" disabled>
                  Create
                </button>
              ) : (
                <button className="btn btn-success" style={{ backgroundColor: "#A7D129", width: "100%" }} type="submit">Create</button>
              )}
                </div>

            </div>
          </form>
        </div>

      </div>
    </>
  );
};
