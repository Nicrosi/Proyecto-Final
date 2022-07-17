import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderUsersByName } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import "./Filter.css";

const initialFilter = {
  sort: "name",
  order: "ascendent",
  gender: "all",
  category: "all",
};

export default function Filter({ setCurrentPage }) {
  const [filterOpt, setFilterOpt] = useState(initialFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterOpt.sort === "name") {
      dispatch(orderUsersByName(filterOpt));
    }
  }, [dispatch, filterOpt]);

  const handleChange = (e) => {
    const name = e.target.name,
      value = e.target.value;
    setFilterOpt({ ...filterOpt, [name]: value });
    setCurrentPage(0);
  };
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <aside className="aside bg-dark">
      <SearchBar />
      <br />
      <h5>Name</h5>
      <div className="form-check ">
        <input
          type="radio"
          name="order"
          value="ascendent"
          id="ascendent"
          className="form-check-input"
          onChange={handleChange}
          defaultChecked={true}
        />
        <label className="" htmlFor="ascendent">
          Ascendent
        </label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="order"
          className="form-check-input"
          value="descendent"
          id="descendent"
          onChange={handleChange}
        />
        <label className="" htmlFor="descendent">
          Descendent
        </label>
      </div>
      <hr />
      <h5>Gender</h5>
      <div className="form-check ">
        <input
          type="radio"
          name="gender"
          className="form-check-input"
          value="all"
          id="all"
          onChange={handleChange}
          defaultChecked={true}
        />
        <label className="" htmlFor="all">
          All
        </label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="gender"
          className="form-check-input"
          value="male"
          id="male"
          onChange={handleChange}
        />
        <label className="" htmlFor="male">
          Male
        </label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="gender"
          value="female"
          className="form-check-input"
          id="female"
          onChange={handleChange}
        />
        <label className="" htmlFor="female">
          Female
        </label>
      </div>
      <hr />
      <h5>Category</h5>
      <div className="form-check ">
        <input
          type="radio"
          name="category"
          value="all"
          className="form-check-input"
          id="allCategory"
          onChange={handleChange}
          defaultChecked={true}
        />
        <label htmlFor="allCategory">All</label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="category"
          value="A"
          className="form-check-input"
          id="A"
          onChange={handleChange}
        />
        <label htmlFor="A">A</label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="category"
          className="form-check-input"
          value="B"
          id="B"
          onChange={handleChange}
        />
        <label htmlFor="B">B</label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="category"
          className="form-check-input"
          value="C"
          id="C"
          onChange={handleChange}
        />
        <label htmlFor="C">C</label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="category"
          className="form-check-input"
          value="E"
          id="E"
          onChange={handleChange}
        />
        <label htmlFor="E">E</label>
      </div>
      <div className="form-check ">
        <input
          type="radio"
          name="category"
          className="form-check-input"
          value="none"
          id="none"
          onChange={handleChange}
        />
        <label htmlFor="none">None</label>
        <div className="mt-5">
        <button type="button" onClick={() => handleReload()}>
          Refresh{" "}
        </button>
      </div>
      </div>
    </aside>
  );
}
