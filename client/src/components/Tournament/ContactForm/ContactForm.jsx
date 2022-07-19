import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MailIcon } from "@heroicons/react/solid";
import emailjs from "@emailjs/browser";
import styles from "./ContactForm.module.css";
import { getAllUsers } from "../../../redux/actions";

const renderAlert = () => {
  <div className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded mb-5 text-center">
    <p>your message submitted successfully</p>
  </div>;
};

export const ContactForm = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const users = useSelector((state) => state.rootReducer.users);
  useEffect(() => {
    dispatch(getAllUsers())
  },[])

  console.log("users", users);
  const email = users.map((el) => el.e_mail);
  const allEmail = [...new Set(email)];
  const emails =  email.join(', ')
  console.log("email", emails);
  // console.log("allemail", allEmail);
  const [input, setInput] = useState({
    name: "",
    email: emails,
    message: "",
  });
  console.log("Input", input);
=======
  const users = useSelector((state) => state.rootReducer.filteredUsers);
  const emails = users.map((el) => el.e_mail).join(", ");
>>>>>>> 0793d044ec29cc3811c0601e166a0035ebbfd3ad
  const [status, setStatus] = useState("");
  const [input, setInput] = useState({ email: "", name: "", message: "" });

  useEffect(() => {
    dispatch(getAllUsers()).then(() => setInput({ ...input, email: emails }));
    console.log("efef");
  }, [dispatch, emails]);

  useEffect(() => {
    if (status === "SUCCESS") {
      setTimeout(() => {
        setStatus("");
      }, 10000);
    }
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

<<<<<<< HEAD
    const message = {
      name: input.name,
      email: emails, 
      message: input.message,
    }

    console.log(message)

=======
  const handleSubmit = (e) => {
    e.preventDefault();
>>>>>>> 0793d044ec29cc3811c0601e166a0035ebbfd3ad
    emailjs
      .send("service_7mimo0g", "template_2ah1aoj", message, "cYHyGctWLF2I5zGsl")
      .then(
        (response) => {
          console.log("success", response);
          setInput((prevInput) => ({
            name: "",
            email: prevInput.email,
            message: "",
          }));
          setInput({
            name: "",
            email: "",
            message: "",
          });
          setStatus("SUCCESS");
        },
        (error) => {
          console.log("failed", error);
        }
      );
  };

  return (
    <>
      <div className={styles.formBox}>
        <h3 className={styles.subtitle}>Send a Message to Players</h3>
        {status && renderAlert()}
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
              <label htmlFor="floatingInput">Subject</label>
            </div>
          </div>

          <div className={styles.messageBox}>
            <div className="form-floating me-2" style={{ width: "70%" }}>
              <textarea
                onChange={(e) => handleChange(e)}
                name="message"
                type="text"
                placeholder="Write a message..."
                value={input.message}
                className="form-control"
                style={{ height: "200px" }}
              />
              <label htmlFor="floatingInput">Message</label>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-outline-white px-4 py-2"
                style={{ backgroundColor: "#A7D129" }}
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