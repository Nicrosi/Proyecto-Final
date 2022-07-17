import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersName } from "../../redux/actions";
import "./SearchBar.css";

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
          className="inputForm inputSearch"
          type="text"
          placeholder="Username"
          value={input}
          onChange={(e) => handleOnChange(e)}
        />
        <button className="mx-1" type="submit" >Search</button>
      </form>
    </div>
  );
}
