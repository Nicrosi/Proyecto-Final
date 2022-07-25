import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersName } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import searchIcon from "../../img/search-icon.png";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(getAllUsersName(input));
    setInput("");
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
          className={`${styles.inputSearch} inputSearch`}
          type="text"
          placeholder="Username"
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
