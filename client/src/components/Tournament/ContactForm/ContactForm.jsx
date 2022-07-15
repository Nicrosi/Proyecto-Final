import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MailIcon } from "@heroicons/react/solid";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const users = useSelector((state) => state.users);

  const emails = users.map((el) => el.e_mail);
  const allEmail = [...new Set(emails)];

  const [input, setInput] = useState({
    name: "",
    email: emails.join(", "),
    message: "",
  });

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
      }, 10000);
    }
  }, [status]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);

    emailjs
      .send("service_7mimo0g", "template_2ah1aoj", input, "cYHyGctWLF2I5zGsl")
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
  }

  return (
    <>
      <div className="" style={{ minHeight: "10vh", width: "100%" }}>
        {status && renderAlert}
        <div
          className="mx-auto hstack justify-content-around"
          style={{ width: "100%" }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <h3 className="text-gray-700 mb-7 text-xl font-semibold text-center">
              Send a Message to Players
            </h3>
            <ul
              className="list-group list-group-horizontal mx-auto bg-gray-900 "
              style={{ width: "100%" }}
            >
              <li
                className="list-group-item"
                style={{ width: "90%", color: "green" }}
              >
                <div>
                  <h5 className="card-text bg-gray-700 ">Email</h5>
                  <input
                    onChange={(e) => handleChange(e)}
                    label="Subject"
                    name="name"
                    type="text"
                    placeholder="Subject"
                    value={input.name}
                  />

                  <br />
                  <li className="list-group-item" style={{ width: "90%" }}>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      onChange={(e) => handleChange(e)}
                      label="Message"
                      name="message"
                      placeholder="Message"
                      value={input.message}
                    />
                  </li>
                </div>
              </li>
            </ul>
            <button
              type="submit"
              className="mt-4 bg-gray-900 text-gray-200 rounded hover:bg-gray-700 px-4 py-1 mb-2 focus:outline-none"
            >
              Send <MailIcon className="w-6 ml-2 float-right" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
const renderAlert = () => {
  <div className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded mb-5 text-center">
    <p>your message submitted successfully</p>
  </div>;
};
