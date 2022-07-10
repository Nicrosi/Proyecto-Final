import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postSponsor } from "../../redux/actions";
import styles from './FormSponsor.module.css'


export const FormSponsor = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    company: "",
    message: "",
    logo: "",
    link: "",
  });
  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
  }

  return (
    <>
      <div className={styles.mainContainerCreation}>
        Sponsor Creation
        <form onSubmit={((e) => handleOnSubmit(e))}>
          <div className={styles.formContainer}>
            
            <div className={styles.Section}>
              <label>Company</label>
              <input
                key="company"
                type="text"
                onChange={(e) => handleOnChange(e)}
                placeholder="Company Name..."
                name="company"
                value={input.name}
                required
              />
              <label>Message</label>
              <input
                key="message"
                type="text"
                onChange={(e) => handleOnChange(e)}
                placeholder="Company Message..."
                name="message"
                value={input.message}
              />
              <label>Logo</label>
              <input
                key="logo"
                type="url"
                onChange={(e) => handleOnChange(e)}
                placeholder="http://image.com"
                name="logo"
                value={input.logo}
              />
              <label>link</label>
              <input
                key="link"
                type="url"
                onChange={(e) => handleOnChange(e)}
                placeholder="http://company.com"
                name="link"
                value={input.link}
              />
              <div>
               
                <button className={styles.button} type="submit"> Add Sponsor </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
