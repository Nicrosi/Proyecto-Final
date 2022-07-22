import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ControlSearchBar.module.css";
 import searchIcon from "../../../../img/search-icon.png";
import { getAllUsersName } from "../../../../redux/actions";

export default function ControlSearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();

    dispatch(getAllUsersName(input));   //<-- aqui colocar action creada por FERNANDO!!,
  };

  const handleOnChange = function (e) {
    setInput(e.target.value);
  };


  return (
    <div
      className="d-flex justify-content-center"
      style={{ paddingTop: "10px" }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="d-flex justify-content-center"
        style={{width: "200px"}} 
      >
        <input
          className={`${styles.inputSearch} inputSearch`}
          type="text"
          value={input}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          className={styles.btnSearch}
          alt="search icon"
          type="image"
          src={searchIcon}
        />
      </form>
    </div>
  );
}
