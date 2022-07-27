import React, { useState } from "react";
import { getAllSponsors, putSponsor} from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ControlSponsorsList.module.css"
import ControlCardSponsor from "../ControlCardSponsor/ControlCardSponsor";
import Swal from "sweetalert2";
import validate from './Validations';
import Form from 'react-bootstrap/Form';



export default function ControlSponsorsList() {
  const sponsors = useSelector((state) => state.rootReducer.sponsors);

  const [updateList, setUpdateList] = useState(false);
  const [UserImage, setUserImage] = useState(null);
  const [dataModal, setDataModal] = useState({});
  const [error, setError] = useState({});


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSponsors());
  }, [dispatch, updateList]);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.type === "file") {
      return setUserImage(e.target.files[0])
    } else {

      setDataModal({ ...dataModal, [e.target.name]: e.target.value });
      setError(
        validate({
          ...dataModal, 
          [e.target.name]: e.target.value
        })
      )
    }
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
        if(UserImage) {
          const formData = new FormData();
          formData.append('image', UserImage);
          
          const Sponsor = {
            userInfo: dataModal,
            userImage: formData
          }
      
          dispatch(putSponsor(dataModal.id_sponsor, Sponsor)); 
        } else {
          const Sponsor = {
            userInfo: dataModal,
          }
          dispatch(putSponsor(dataModal.id_sponsor, Sponsor)); 
        }
       
        Swal.fire('Saved!', '', 'success');

        dispatch(getAllSponsors());
        setUpdateList(!updateList)
        // window.location.reload()

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })    
    console.log(dataModal);
  }

  return (
    <div className={styles.userBox}>
            <ul className="list-group" style={{ width: "90%" }}>

      {sponsors &&
        sponsors.map((sponsor) => {
          return (
            <li key={sponsor.id_sponsor} className="list-group-item">

              <ControlCardSponsor 
                sponsor={sponsor} 
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
                      <div key={dataModal.id_sponsor} className={styles.editBox}>
                        <div className={"row g-2 mb-3"}>
                          <div className="form-floating col-md">
                          <input
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={dataModal.company}
                            placeholder=""
                            name="company"
                            id="floatingInput"
                            className={
                              error.company
                                ? "form-control border-0 is-invalid"
                                : "form-control border-0 is-valid"
                            }
                          />
                          {error.company && (
                            <div
                              id="validationServerUsernameFeedback"
                              className="invalid-feedback"
                            >
                              {error.company}
                            </div>
                          )}
                          <label htmlFor="floatingInput">Company</label>
                          </div>
                          <div className="form-floating col-md">
                          <input
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={dataModal.message}
                            name="message"
                            id="floatingInput"
                            className={
                              error.message
                                ? "form-control border-0 is-invalid"
                                : "form-control border-0 is-valid"
                            }
                          />
                          {error.message && (
                            <div
                              id="validationServerUsernameFeedback"
                              className="invalid-feedback"
                            >
                              {error.message}
                            </div>
                          )}
                          <label htmlFor="floatingInput">Message</label>
                          </div>
                        </div>

                        <div className="row g-2 mb-3">
                          <div className="form-floating col-md">
                          <input
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={dataModal.link}
                            name="link"
                            id="floatingInput"
                            className={
                              error.link
                                ? "form-control border-0 is-invalid"
                                : "form-control border-0 is-valid"
                            }
                          />
                          {error.link && (
                            <div
                              id="validationServerUsernameFeedback"
                              className="invalid-feedback"
                            >
                              {error.link}
                            </div>
                          )}
                          <label htmlFor="floatingInput">Link</label>
                          </div>
                          
                          <Form.Group controlId="formFileLg" className="mb-3">
                            <h5
                              className="modal-title"
                              id="staticBackdropLabel"
                              style={{ color: "#bebebe" }}
                            >
                              Sponsor Logo
                            </h5>
                            <Form.Control 
                              type="file" 
                              size="lg" 
                              onChange={(e) => handleChange(e)}
                            />
                          </Form.Group>
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
          )})}
    </ul>
    </div>
  );
}
