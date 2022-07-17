import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUserById } from "../../../redux/actions";
import styles from "./ProfileUser.module.css";
import PersonalInfoUser from "../PersonalInfoUser/PersonalInfoUser.jsx";
import CategoryScoreUser from "../CategoryScoreUser/CategoryScoreUser.jsx";
import { FormUser } from "../FormUser/FormUser";
import { Redirect } from "react-router-dom";
import { verifyUser } from "../../../redux/actions/authorization";

export default function ProfileUser(props) {
  const params = Number(props.match.params.userId);
  const dispatch = useDispatch();
  const [show, setShow] = useState("personalInformation");
  const [showEdit, setShowEdit] = useState(true);

  useEffect(() => {
    dispatch(getUserById(params));
    dispatch(verifyUser());
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, params, showEdit]);

  let user = useSelector((state) => state.rootReducer.user);
  const auth = useSelector((state) => state.auth);
  function handleClic(e) {
    setShow(e.target.name);
  }

  function handleClicShowEdit() {
    setShowEdit(false);
  }

  return (
    <React.Fragment>
      {Number(auth.currentUser.dni) === params ? (
        <div className={styles.containerBox}>
          <div className={styles.PanelBox}>
            <img src={user.picture} className={styles.pictureUser} alt="..." />
            <h1 className={styles.nameUser}>{user.name}</h1>
            <h1 className={styles.nameUser}>{user.last_name}</h1>
            {showEdit === true && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-dark my-2"
                onClick={() => handleClicShowEdit()}
                style={{ width: "150px" }}
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className={styles.principalBox}>
            {showEdit === false ? (
              <FormUser
                dni={user.dni}
                name={user.name}
                last_name={user.last_name}
                is_admin={user.is_admin}
                e_mail={user.e_mail}
                picture={user.picture}
                gender={user.gender}
                phone={user.phone}
                num_contact={user.num_contact}
                setShowEdit={setShowEdit}
              />
            ) : (
              <>
                <div className={styles.navBar}>
                  <input
                    type="submit"
                    name="personalInformation"
                    onClick={(e) => handleClic(e)}
                    className={styles.navBarItems}
                    value="Personal Information"
                  />
                  <input
                    type="submit"
                    name="category"
                    onClick={(e) => handleClic(e)}
                    className={styles.navBarItems}
                    value="Category"
                  />
                </div>
                <div className={styles.secondaryBox}>
                  {show === "personalInformation" && (
                    <PersonalInfoUser user={user} />
                  )}
                  {show === "category" && (
                    <CategoryScoreUser user={user} params={params} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Redirect to={`/Profile/${auth.currentUser.dni}`} />
      )}
    </React.Fragment>
  );
}
