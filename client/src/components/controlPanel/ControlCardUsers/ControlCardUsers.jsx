import React, { useState } from "react";
import { putUsers } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./ControlCardUsers.module.css"

export default function ControlCardUsers({
  dni, name, last_name, is_admin, e_mail, password, picture, gender, phone, num_contact}) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    dni: dni,
    name: name,
    last_name: last_name,
    is_admin: is_admin,
    e_mail: e_mail,
    password: password,
    picture: picture,
    gender: gender,
    phone: phone,
    num_contact: num_contact
  });
  console.log(input);

  function handleChange(e) {
    e.preventDefault();

    if (e.target.type === "tel") {
      setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10) });
    }
    if (e.target.type === "text" || e.target.type === "email") {
      setInput((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.toLowerCase(),
      }));
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putUsers(dni, input));
  }
  return (

 ( <div className={styles.containerBox}>
      
        <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>

          <div key={dni} className="card p-3">
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.name}
                  name="name"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.last_name}
                  name="last_name"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Last Name</label>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={input.dni}
                    name="dni"
                    className="form-control border-0"
                    id="floatingInput"
                  />
                  <label for="floatingInput">DNI</label>
                </div>
                <div className="form-floating col-md">
                  <select
                    onChange={(e) => handleChange(e)}
                    className="form-select border-0"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="is_admin"
                  >
                    <option value="">{input.is_admin}</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  <label for="floatingInput">isAdmin</label>
                </div>
            </div>

            <div className="row g-2 mb-3">

              <div className="form-floating col-md">
                <input
                  type="email"
                  onChange={(e) => handleChange(e)}
                  value={input.e_mail}
                  name="e_mail"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Email</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.picture}
                  name="picture"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Picture</label>
              </div>
              <div className="form-floating col-md">
                <select
                  onChange={(e) => handleChange(e)}
                  className="form-select border-0"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  name="gender"
                >
                  <option value="">{input.gender}</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                <label for="floatingInput">Gender</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="tel"
                  onChange={(e) => handleChange(e)}
                  value={input.phone}
                  name="phone"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Phone</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="tel"
                  onChange={(e) => handleChange(e)}
                  value={input.num_contact}
                  name="num_contact"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Emergency Number</label>
              </div>
            </div>

            {/* <h5 onClick={()=>handleOnClick()}>dni={p.category.type}</h5> */}
            <button className="btn btn-outline-secondary btn-dark my-2" type="submit">Confirm changes</button>
          </div>

        </form>

    </div>)

  );
}
