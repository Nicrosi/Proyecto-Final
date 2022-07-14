import React, { useState } from "react";
import { getAllSponsors, putSponsor } from "../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ControlCardSponsor({
  id_sponsor,
  company,
  message,
  logo,
  link,
}) {
  const [input, setInput] = useState({
    company: company,
    message: message,
    logo: logo,
    link: link,
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
    dispatch(putSponsor(id_sponsor, input));
    console.log(input);
  }
  return (
    <div style={{ marginTop: "48px" }}>
      <div className="row">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            key={id_sponsor}
            className="col-sm-3"
            style={{ border: "solid black" }}
          >
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.company}
                  placeholder=""
                  name="company"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Company</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.message}
                  name="message"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Message</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.logo}
                  placeholder=""
                  name="logo"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Logo</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.link}
                  name="link"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Link</label>
              </div>
            </div>
            <button type="submit">Confirm changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
