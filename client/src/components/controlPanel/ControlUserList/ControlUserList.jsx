import React, { useState } from "react";
import { clearUser, getAllUsers, putUsers } from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ControlUserList.module.css";
import ControlCardUsers from "../ControlCardUsers/ControlCardUsers";
import Swal from "sweetalert2";
import validate from './Validations';
import Form from 'react-bootstrap/Form';


export default function ControlUserList() {
  const users = useSelector((state) => state.rootReducer.filteredUsers);

  const [updateList, setUpdateList] = useState(false);
  const [UserImage, setUserImage] = useState(null);
  const [dataModal, setDataModal] = useState({});
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, updateList]);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.type === "file") {
      return setUserImage(e.target.files[0])
    } else if (e.target.type === "text" || e.target.type === "email") {
      setDataModal((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.toLowerCase(),
      }));
      setError(
        validate({
          ...dataModal, 
          [e.target.name]: e.target.value.toLowerCase(),
        })
      )
    } else {

      setDataModal({ ...dataModal, [e.target.name]: e.target.value });
      setError(
        validate({
          ...dataModal, 
          [e.target.name]: e.target.value
        })
      )
    }
    
    // console.log(dataModal);
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
          
          const User = {
            userInfo: dataModal,
            userImage: formData
          }
      
          dispatch(putUsers(dataModal.id_user, User));
        } else {
          const User = {
            userInfo: dataModal,
          }
          dispatch(putUsers(dataModal.id_user, User));
        }
       
        Swal.fire('Saved!', '', 'success');
        dispatch(clearUser());
        dispatch(getAllUsers());
        setUpdateList(!updateList)

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  return (
    <div className={styles.userBox}>
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
                          <div key={dataModal.id_user} className={styles.editBox}>
                          
                            <div className={"row g-2 mb-3"}>
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.name}
                                  name="name"
                                  id="floatingInput"
                                  className={
                                    error.name
                                      ? "form-control  border-0 is-invalid"
                                      : "form-control  border-0 is-valid"
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
                                <label htmlFor="floatingInput">Name:</label>
                              </div>
                              <div className="form-floating col-md">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.last_name}
                                  name="last_name"
                                  id="floatingInput"
                                  className={
                                    error.last_name
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                />
                                {error.last_name && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.last_name}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">Last Name</label>
                              </div>
                            </div>

                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  key="dni"
                                  type="number"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal?.dni}
                                  name="dni"
                                  id="floatingInput"
                                  className={
                                    error.dni
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  } 
                                />
                                {error.dni && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.dni}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">DNI</label>
                              </div>
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  name="is_admin"
                                  className={
                                    error.e_mail
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                >
                                  <option value="">{`${dataModal.is_admin}`}</option>
                                  <option value="true">True</option>
                                  <option value="false">False</option>
                                </select>
                                <label htmlFor="floatingInput">isAdmin</label>
                              </div>
                              {error.e_mail && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.e_mail}
                                  </div>
                                )}
                            </div>

                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <input
                                  type="email"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.e_mail}
                                  name="e_mail"
                                  id="floatingInput"
                                  className={
                                    error.e_mail
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                />
                                {error.e_mail && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.e_mail}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">Email</label>
                              </div>
                            </div>
                            <div className="row g-2 mb-3">
                              <div className="form-floating col-md">
                                <select
                                  onChange={(e) => handleChange(e)}
                                  className="form-select border-0 is-valid"
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
                                  key="phone"
                                  type="number"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.phone}
                                  name="phone"
                                  id="floatingInput"
                                  className={
                                    error.phone
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                />
                                {error.phone && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.phone}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">Phone</label>
                              </div>
                              <div className="form-floating col-md">
                                <input
                                  key="num_contact"
                                  type="number"
                                  onChange={(e) => handleChange(e)}
                                  value={dataModal.num_contact}
                                  name="num_contact"
                                  id="floatingInput"
                                  className={
                                    error.num_contact
                                      ? "form-control border-0 is-invalid"
                                      : "form-control border-0 is-valid"
                                  }
                                />
                                {error.num_contact && (
                                  <div
                                    id="validationServerUsernameFeedback"
                                    className="invalid-feedback"
                                  >
                                    {error.num_contact}
                                  </div>
                                )}
                                <label htmlFor="floatingInput">
                                  Emergency Number
                                </label>
                              </div>
                              <Form.Group controlId="formFileLg" className="mb-3">
                                <h5
                                  className="modal-title"
                                  id="staticBackdropLabel"
                                  style={{ color: "#bebebe" }}
                                >
                                  Profile Image
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
            );
          })}
      </ul>
    </div>
  );
}
