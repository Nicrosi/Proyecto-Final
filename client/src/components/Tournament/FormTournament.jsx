import React, { useState } from "react";
import axios from "axios";
import img1 from '../../assets/fototorneo.jpg'
export const FormTournament = () => {
  const [input, setInput] = useState({
    date: "",
    location: "",
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
                    name="Date"
                    value={input.name}
                    required
                  />
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
                    required
                  />
                </div>
              </li>
            </ul>
          </div>

          <div className="d-grid gap-2 mb-3" style={{ width: "90%" }}>
            <button className="btn btn-success" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};
