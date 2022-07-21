import React, { useState } from "react";
import { getAllSponsors, putSponsor} from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ControlSponsorsList.module.css"
import ControlCardSponsor from "../ControlCardSponsor/ControlCardSponsor";


export default function ControlSponsorsList() {
  const sponsors = useSelector((state) => state.rootReducer.sponsors);

  const [dataModal, setDataModal] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSponsors());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();

    setDataModal({ ...dataModal, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putSponsor(dataModal.id_sponsor, dataModal));
    console.log(dataModal);
  }

  return (
    <div className={styles.userBox}>
            <ul className="list-group" style={{ width: "90%" }}>

      {sponsors &&
        sponsors.map((sponsor) => {
          return (
            <li className="list-group-item">

              <ControlCardSponsor 
                sponsor={sponsor} setDataModal={setDataModal} 
              />
              <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
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
                      Editar información del sponsor {dataModal.company}
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
                  value={dataModal.company}
                  placeholder=""
                  name="company"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Company</label>
                          </div>
                          <div className="form-floating col-md">
                          <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={dataModal.message}
                  name="message"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Message</label>
                          </div>
                        </div>

                        <div className="row g-2 mb-3">
                          <div className="form-floating col-md">
                          <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={dataModal.logo}
                  placeholder=""
                  name="logo"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Logo</label>
                          </div>
                          <div className="form-floating col-md">
                          <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={dataModal.link}
                  name="link"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label for="floatingInput">Link</label>
                          </div>
                        </div>

                  

                        {/* <h5 onClick={()=>handleOnClick()}>dni={p.category.type}</h5> */}
                        <div class="modal-footer">
                        <button
                          className="btn btn-outline-secondary btn-dark my-2"
                          type="submit"
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
          )})}
    </ul>
    </div>
  );
}
