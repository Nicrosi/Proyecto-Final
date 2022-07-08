import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderUsersByName } from "../../redux/actions";

const initialFilter = {
  sort: "name",
  order: "ascendent",
  gender: "all",
  category: "all",
};

export default function Filter() {
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
  };

  return (
    <>
      <h4>Name</h4>
      <input
        type="radio"
        name="order"
        value="ascendent"
        id="ascendent"
        onChange={handleChange}
        defaultChecked={true}
      />
      <label htmlFor="ascendent">ascendent</label>
      <input
        type="radio"
        name="order"
        value="descendent"
        id="descendent"
        onChange={handleChange}
      />
      <label htmlFor="descendent">descendent</label>

      <h4>Gender</h4>
      <input
        type="radio"
        name="gender"
        value="all"
        id="all"
        onChange={handleChange}
        defaultChecked={true}
      />
      <label htmlFor="all">all</label>
      <input
        type="radio"
        name="gender"
        value="male"
        id="male"
        onChange={handleChange}
      />
      <label htmlFor="male">male</label>
      <input
        type="radio"
        name="gender"
        value="female"
        id="female"
        onChange={handleChange}
      />
      <label htmlFor="female">female</label>

      {/* <h4>Category</h4>
      <input
        type="radio"
        name="category"
        value="all"
        id="allCategory"
        onChange={handleChange}
        defaultChecked={true}
      />
      <label htmlFor="allCategory">all</label>

      <input
        type="radio"
        name="category"
        value="A"
        id="A"
        onChange={handleChange}
      />
      <label htmlFor="A">A</label>

      <input
        type="radio"
        name="category"
        value="B"
        id="B"
        onChange={handleChange}
      />
      <label htmlFor="B">B</label>

      <input
        type="radio"
        name="category"
        value="C"
        id="C"
        onChange={handleChange}
      />
      <label htmlFor="C">C</label>

      <input
        type="radio"
        name="category"
        value="E"
        id="E"
        onChange={handleChange}
      />
      <label htmlFor="E">E</label> */}
    </>
  );
}
