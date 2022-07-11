import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersName } from "../../redux/actions";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const [inputVg, setInputVg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();

    dispatch(getAllUsersName(inputVg));
  };

  const handleOnChange = function (e) {
    setInputVg(e.target.value);
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
            value={inputVg}
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
