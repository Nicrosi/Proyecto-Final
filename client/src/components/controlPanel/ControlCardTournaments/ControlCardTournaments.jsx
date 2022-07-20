import React, { useState } from "react";
import { getAllSponsors, putSponsor } from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./ControlCardTournaments.module.css"

export default function ControlCardTournaments({
  id_tournaments,
  name,
  date,
  location,
  earning,
}) {
  const [input, setInput] = useState({
    name: name,
    date: date,
    location: location,
    earning: earning,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSponsors());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();

    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putSponsor(id_tournaments, input));
    console.log(input);
  }
  return (
    <div className={styles.containerBox}>
        <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
          <div key={id_tournaments} className="card p-3">
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.name}
                  placeholder=""
                  name="name"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="date"
                  onChange={(e) => handleChange(e)}
                  value={input.date}
                  name="date"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Date</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.location}
                  name="location"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Location</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.earning}
                  name="earning"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Earning</label>
              </div>
            </div>
            <button className="btn btn-outline-secondary btn-dark my-2" type="submit">Confirm changes</button>
          </div>
        </form>
    </div>
  );
}
