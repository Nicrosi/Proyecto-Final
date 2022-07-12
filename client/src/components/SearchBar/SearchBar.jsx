import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersName } from "../../redux/actions";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();

    dispatch(getAllUsersName(input));
  };

  const handleOnChange = function (e) {
    setInput(e.target.value);
  };

  const location = useLocation();
  if (location.pathname === "/Users") {
    //si esta en home renderiza el componente de busqueda
    return (
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "10px" }}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="d-flex justify-content-center"
        >
          <input
            className="inputForm"
            type="text"
            placeholder="User"
            value={input}
            onChange={(e) => handleOnChange(e)}
          />
          <input className="buttonForm" type="submit" value="Search" />
        </form>
      </div>
    );
  } else {
    return <div></div>;
  }
}
