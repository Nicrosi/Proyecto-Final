import React, { useState } from "react";
import { clearSubtournament, getAllSubtournaments, putSubtournament } from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../ControlUserList/ControlUserList.module.css";
// import ControlCardUsers from "../ControlCardUsers/ControlCardUsers";
import Swal from "sweetalert2"
import ControlCardSubtournament from "../ControlCardSubtournament/ControlCardSubtournament.jsx";


export default function ControlSubtournamentsList() {
  const subtournaments = useSelector((state) => state.rootReducer.subtournaments);

  const [updateList, setUpdateList] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubtournaments());
  }, [dispatch, updateList]);


  function handleChange(e) {
    e.preventDefault();
    setDataModal({ ...dataModal, [e.target.name]: e.target.value });
  }

   function handleSubmit(e) {
    e.preventDefault();
    console.log( dataModal);
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
        dispatch(putSubtournament(dataModal.id_subt, dataModal));
       
        Swal.fire('Saved!', '', 'success');
        dispatch(clearSubtournament());
        setUpdateList(!updateList)

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  


  return (
    <div className={styles.userBox}>
      <ul className="list-group" style={{ width: "90%" }}>
        {subtournaments &&
          subtournaments.map((subtournament) => {
            return (
              <li key={subtournament.id_subt} className="list-group-item">
                <ControlCardSubtournament
                  subtournament={subtournament}
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
                                  key="name"
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
                                  key="numb_players"
                                  type="number"
                                  min="4"
                                  max="16"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.numb_players}
                                  name="numb_players"
                                  className="form-control border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">Numb Players</label>
                              </div>
                            </div>

                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  key="price"
                                  type="number"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.price}
                                  name="price"
                                  className="form-control border-0"
                                  id="floatingInput"
                                />
                                <label htmlFor="floatingInput">Price</label>
                              </div>
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="gender"
                                >
                                  <option value="">{`${dataModal.gender}`}</option>
                                  <option value="female">Female</option>
                                  <option value="male">Male</option>
                                </select>
                                <label htmlFor="floatingInput">Gender</label>
                              </div>
                            </div>

                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="elimination_type"
                                >
                                  <option value="">{`${dataModal.elimination_type}`}</option>
                                  <option value="All">All vs All</option>
                                  <option value="Simple">Simple Elimination</option>
                                  <option value="Double">Double Elimination</option>
                                </select>
                                <label htmlFor="floatingInput">Elimination Type</label>
                              </div>
                            </div>
                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="match_type"
                                >
                                  <option value="">{`${dataModal.match_type}`}</option>
                                  <option value="singles">singles</option>
                                  <option value="dobles">dobles</option>
                                </select>
                                <label htmlFor="floatingInput">Match Type</label>
                              </div>
                            </div>
                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="id_category"
                                >
                                  <option value="">{`${dataModal?.category ? dataModal.category.type : null}`}</option>
                                  <option value="1">A</option>
                                  <option value="2">B</option>
                                  <option value="3">C</option>
                                  <option value="4">E</option>
                                </select>
                                <label htmlFor="floatingInput">Category</label>
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
    </div>
  );
}
