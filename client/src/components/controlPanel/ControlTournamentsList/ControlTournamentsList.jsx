import React, { useState } from "react";
import {
  getAllUsers,
  getTournament,
  putTournament,
} from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ControlTournamentsList.module.css";
import ControlCardTournaments from "../ControlCardTournaments/ControlCardTournaments";
import Swal from "sweetalert2";
import validate from './Validations';

export default function ControlTournamentsList() {
  const tournaments = useSelector((state) => state.rootReducer.tournaments);

  const [updateList, setUpdateList] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [error, setError] = useState({});


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTournament());
  }, [dispatch, updateList]);

  function handleChange(e) {
    e.preventDefault();
    setDataModal({ ...dataModal, [e.target.name]: e.target.value });
    setError(
      validate({
        ...dataModal, 
        [e.target.name]: e.target.value
      })
    )
  }


  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#A7D129",
      denyButtonColor: "rgb(43, 43, 44)",
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(putTournament(dataModal.id_tournament, dataModal));
        Swal.fire("Saved!", "", "success");

        dispatch(getTournament());
        setUpdateList(!updateList);

        // window.location.reload()
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  return (
    <div className={styles.userBox}>
      <ul className="list-group" style={{ width: "90%" }}>
        {tournaments &&
          tournaments.map((tournament) => {
            return (
              <li key={tournament.id_tournament} className="list-group-item">
                <ControlCardTournaments
                  tournament={tournament}
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
                          Editar información del tournament {dataModal.name}
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
                          <div
                            key={dataModal.id_tournaments}
                            className={styles.editBox}
                          >
                            <div className={"row g-2 mb-3"}>
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.name}
                                  placeholder=""
                                  name="name"
                                  id="floatingInput"
                                  className={
                                    error.name
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                />
                                {error.name && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.name}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">Name</label>
                              </div>
                              <div className="form-floating col-md">
                                <input
                                  type="date"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.date}
                                  name="date"
                                  id="floatingInput"
                                  className={
                                    error.date
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                />
                                {error.date && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.date}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">Current Date {dataModal?.date?.slice(0,10)}</label>
                              </div>
                            </div>

                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.location}
                                  placeholder=""
                                  name="location"
                                  id="floatingInput"
                                  className={
                                    error.location
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                />
                                {error.location && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.location}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">Location</label>
                              </div>
                            </div>
                            <div className="modal-footer">
                              {Object.keys(error).length > 0 ? (
                                <button
                                  className="btn btn-outline-secondary btn-dark my-2"
                                  type="submit"
                                  data-bs-dismiss="modal"
                                  disabled
                                >
                                  Confirm changes
                                </button>
                              ) : (
                                <button
                                  className="btn btn-outline-secondary btn-dark my-2"
                                  type="submit"
                                  data-bs-dismiss="modal"
                                >
                                  Confirm changes
                                </button>
                              )}
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
