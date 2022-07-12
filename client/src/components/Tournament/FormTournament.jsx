import React, { useState } from "react";
import axios from "axios";
import img1 from '../../assets/fototorneo.jpg'


export function validate(input) {
  let error = {};
  
  if (!input.date) {
    error.company = "Name is required";
  } else if (
    !/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(input.date) &&
    input.date
  ) {
    error.date = "Invalid date format";
  }

  if (!input.location) {
    error.location = "location is required";
  } else if (input.location.length > 255) {
    error.location = "Enter less than 255 characters";
  }

  return error;
}

export const FormTournament = () => {
  const noError = "Looks good"
  const [input, setInput] = useState({
    date: "",
    location: "",
  });

  const [error, setError] = useState({
    date: "date is required",
    location: "location is required",
  });

  async function handleOnSubmit(e) {
    e.preventDefault();
    await axios.post(`http://localhost:3001/tournament`, input);
    alert("successfully created Tournament");
  };

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }

  return (
    <div
      className="mb-4 mx-auto hstack justify-content-center"
      style={{ minHeight: "100vh", width: "100%" }}
    >
        <img
          className="d-block w-100"
          src={img1}
          alt=""
          style={{ objectFit: "cover", height: "100vh" }}/>
         <div
      className=" display-7 hstack justify-content-center"
      style={{ minHeight: "100vh", width: "100%" }}
    >TOURNAMENT CREATION</div>
        
      <div
        className="mx-auto hstack justify-content-around"
        style={{ width: "100%" }}
      >
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className="hstack mb-3">
            <ul
              className="list-group list-group-horizontal mx-auto"
              style={{ width: "100%" }}
            >
              <li className="list-group-item" style={{ width: "30%" }}>
                <div>
                  <h5 className="card-text">Date</h5>
                  <input
                    key="date"
                    type="date"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Tournaments Date..."
                    name="date"
                    value={input.name}
                    required
                    className={error.date?"form-control is-invalid":"form-control is-valid"}
                  />{error.date ?
                    <div id="validationServerUsernameFeedback" className="invalid-feedback">
                    {error.date}
                    </div>:
                    <div id="validationServerUsernameFeedback" className="valid-feedback">
                    {noError}
                    </div>
                  }
                </div>
              </li>

              <li className="list-group-item" style={{ width: "30%" }}>
                <div>
                  <h5 className="card-text">Location: </h5>
                  <input
                    key="Location"
                    type="text"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Tournaments Location..."
                    name="location"
                    value={input.location}
                    className={error.location?"form-control is-invalid":"form-control is-valid"}
                  />{error.location ?
                    <div id="validationServerUsernameFeedback" className="invalid-feedback">
                    {error.location}
                    </div>:
                    <div id="validationServerUsernameFeedback" className="valid-feedback">
                    {noError}
                    </div>
                  }
                </div>
              </li>
            </ul>
          </div>

          <div className="d-grid gap-2 mb-3" style={{ width: "90%" }}>
          {Object.keys(error).length > 0 ? (
              <button className="btn btn-secondary" style={{ backgroundColor: "#A7D129" }} type="submit" disabled>
                Create
              </button>
            ) : (
              <button className="btn btn-success" style={{ backgroundColor: "#A7D129" }} type="submit">Create</button>
            )}
          </div>
        </form>
      </div>
      
    </div>
  );
};
