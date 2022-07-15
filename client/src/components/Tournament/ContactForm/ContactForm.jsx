import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MailIcon } from "@heroicons/react/solid";
import emailjs from "@emailjs/browser";
import styles from "./ContactForm.module.css";

export const ContactForm = () => {
  
  const users = useSelector((state) => state.users);
  
  console.log('users',users);
  const email = users.map((el) => el.e_mail);
  const allEmail = [...new Set(email)];
  console.log("email", email);
  console.log("allemail", allEmail);
  const [input, setInput] = useState({
    name: "",
    email: "",
    my_file: "",
    message: "",
  });
  console.log("Input", input);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (status === "SUCCESS") {
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }, [status]);

  function handleSubmit(e) {
    e.preventDefault();
    emailjs
      .send("service_7mimo0g", "template_2ah1aoj", input, "cYHyGctWLF2I5zGsl")
      .then(
        (response) => {
          console.log("success", response);

          setInput({
            name: "",
            email: "",
            my_file: "",
            message: "",
          });
          setStatus("SUCCESS");
        },
        (error) => {
          console.log("failed", error);
        }
      );
  }

  return (
    <>
      <div className={styles.formBox}>
      <h3 className={styles.subtitle}>Send a Message to Players</h3>
        {status && renderAlert}
        <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
        <div className="row g-2 mb-3">
          <div className="form-floating col-md">
          <input
            onChange={(e) => handleChange(e)}
            name="name"
            type="text"
            placeholder="Write your name..."
            id="floatingInput"
            value={input.name}
            className="form-control"
          />
          <label htmlFor="floatingInput">Full Name</label>      
          </div>
          <div className="form-floating col-md">
          <input
            onChange={(e) => handleChange(e)}
            name="email"
            type="email"
            placeholder="example: admin@gmail.com"
            id="floatingInput"
            value={input.email}
            className="form-control"
          />
          <label htmlFor="floatingInput">E-mail</label>      
          </div>
        </div>
        <div className="row g-2">
          <div className="input-group mb-3">
          <input
            onChange={(e) => handleChange(e)}
            name="my_file"
            type="file"
            placeholder=""
            value={input.my_file}
            class="form-control" 
            id="inputGroupFile02"
          />   
          </div>
        </div>
          {/* <select onChange={(e) => handleChange(e)}>
            <option value={input.email} label="Email" name="email" placeholder="gaby@gmail.com" type="email">All emails</option>
            {allEmail.map((email) => {
              return email ? (
                <option value={email} key={email}>
                  {email}
                </option>
              ) : (
                ""
              );
            })}
          </select> */}
        <div className={styles.messageBox}>
        <div className="form-floating me-2" style={{width: "70%"}}>
            <input
              onChange={(e) => handleChange(e)}
              name="message"
              type="text"
              placeholder="Write a message..."
              value={input.message}
              className="form-control"
              style={{height: "200px"}}
            />
          <label htmlFor="floatingInput">Message</label>
        </div>
          <div>
          <button
              type="submit"
              className="btn btn-outline-white px-4 py-2"
              style={{ backgroundColor: "#A7D129"
            }}
            >
            Send <MailIcon />
          </button>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};
const renderAlert = () => {
  <div className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded mb-5 text-center">
    <p>your message submitted successfully</p>
  </div>;
};