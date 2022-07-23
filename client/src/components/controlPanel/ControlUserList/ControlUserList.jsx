import React, { useState } from "react";
import { clearUser, getAllUsers, putUsers } from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ControlUserList.module.css";
import ControlCardUsers from "../ControlCardUsers/ControlCardUsers";
import Swal from "sweetalert2"


export default function ControlUserList() {
  const users = useSelector((state) => state.rootReducer.users);
<<<<<<< Updated upstream

  const [updateList, setUpdateList] = useState(false);
  const [dataModal, setDataModal] = useState({});
=======
>>>>>>> Stashed changes

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, updateList]);

  function handleChange(e) {
    e.preventDefault();

    // if (e.target.type === "tel" || e.target.name === "dni") {
    //   setDataModal({
    //     ...dataModal,
    //     [e.target.name]: parseInt(e.target.value, 10),
    //   });
    // }
    // if (e.target.type === "text" || e.target.type === "email") {
    //   setDataModal((prev) => ({
    //     ...prev,
    //     [e.target.name]: e.target.value.toLowerCase(),
    //   }));
    // }
    setDataModal({ ...dataModal, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#A7D129',
      denyButtonColor: 'rgb(43, 43, 44)',
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(putUsers(dataModal.dni, dataModal));
       
        Swal.fire('Saved!', '', 'success');
        // dispatch(clearUser());
        dispatch(getAllUsers());
        setUpdateList(!updateList)

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  return (
    <div className={styles.userBox}>
<<<<<<< Updated upstream
      <ul className="list-group" style={{ width: "90%" }}>
        {users &&
          users.map((user) => {
            return (
              <li key={user.id_user} className="list-group-item">
                <ControlCardUsers
                  user={user}
                  setDataModal={setDataModal}
                  setUpdateList={setUpdateList}
                  updateList={updateList}
                />

                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div
                      className="modal-content"
                      style={{ backgroundColor: "rgb(43, 43, 44)" }}
                    >
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="staticBackdropLabel"
                          style={{ color: "#bebebe" }}
                        >
                          Editar información de {dataModal.name}{" "}
                          {dataModal.last_name}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      (
                      <div className={styles.containerForm}>
                        <form
                          style={{ width: "100%" }}
                          onSubmit={(e) => handleSubmit(e)}
                        >
                          <div key={dataModal.dni} className={styles.editBox}>
                            <div className={"row g-2 mb-3"}>
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.name}
                                  name="name"
                                  className="form-control  border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">Name:</label>
                              </div>
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.last_name}
                                  name="last_name"
                                  className="form-control border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">Last Name</label>
                              </div>
                            </div>

                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.dni}
                                  name="dni"
                                  className="form-control border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">DNI</label>
                              </div>
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="is_admin"
                                >
                                  <option value="">{`${dataModal.is_admin}`}</option>
                                  <option value="true">True</option>
                                  <option value="false">False</option>
                                </select>
                                <label htmlFor="floatingInput">isAdmin</label>
                              </div>
                            </div>

                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  type="email"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.e_mail}
                                  name="e_mail"
                                  className="form-control border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">Email</label>
                              </div>
                            </div>
                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.picture}
                                  name="picture"
                                  className="form-control  border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">Picture</label>
                              </div>
                            </div>
                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="is_admin"
                                >
                                  <option value="">{`${dataModal.category}`}</option>
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="E">E</option>
                                </select>
                                <label htmlFor="floatingInput">Category</label>
                              </div>
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="gender"
                                >
                                  <option value="">{dataModal.gender}</option>
                                  <option value="female">Female</option>
                                  <option value="male">Male</option>
                                </select>
                                <label htmlFor="floatingInput">Gender</label>
                              </div>
                            </div>
                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  type="tel"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.phone}
                                  name="phone"
                                  className="form-control  border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">Phone</label>
                              </div>
                              <div className="form-floating col-md">
                                <input
                                  type="tel"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.num_contact}
                                  name="num_contact"
                                  className="form-control border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">
                                  Emergency Number
                                </label>
                              </div>
                            </div>
                            <div className="modal-footer">

                              <button
                                className="btn btn-outline-secondary btn-dark my-2"
                                type="submit"
                                data-bs-dismiss="modal"
                              >
                                Confirm changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      )
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
=======
  
      {users &&
        users.map((p) => {
          return (
            <div key={p.dni}>
              <ControlCardUsers 
                dni={p.dni}
                name={p.name}
                last_name={p.last_name}
                is_admin={p.is_admin}
                e_mail={p.e_mail}
                password={p.password}
                picture={p.picture}
                gender={p.gender}
                phone={p.phone}
                num_contact={p.num_contact}
              />
              </div>
          )})}
>>>>>>> Stashed changes
    </div>
  );
}
