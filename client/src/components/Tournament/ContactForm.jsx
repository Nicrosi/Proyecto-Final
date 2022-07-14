import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MailIcon } from "@heroicons/react/solid";
import emailjs from "@emailjs/browser";


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
      <div className="lg:mt-48 lg:mr-48 pt-6 pb-8 bg-white shadow-xl rounded p-5">
        {status && renderAlert}
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-gray-700 mb-7 text-xl font-semibold">
            Send a Message to Players
          </h3>
          <input
            onChange={(e) => handleChange(e)}
            label="Full Name"
            name="name"
            type="text"
            placeholder="Sebas"
            value={input.name}
          />
          <input
            onChange={(e) => handleChange(e)}
            label="E-mail"
            name="email"
            type="email"
            placeholder="Gaby@gmail.com"
            value={input.email}
          />
          <input
            onChange={(e) => handleChange(e)}
            label="Attachment"
            name="my_file"
            type="file"
            placeholder=""
            value={input.my_file}
          />

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

          <input
            onChange={(e) => handleChange(e)}
            label="Message"
            name="message"
            type="text"
            placeholder="Message"
            value={input.message}
          />

          <button
            type="submit"
            className="mt-4 bg-gray-900 text-gray-200 rounded hover:bg-gray-700 px-4 py-2 focus:outline-none"
          >
            Send <MailIcon className="w-6 ml-2 float-right" />
          </button>
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
