import React from "react";
import styles from "./HomeAdmin.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../redux/actions";

function HomeAdmin() {
  const user = useSelector((state) => state.rootReducer.user);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if(auth.currentUser.is_admin) {
      dispatch(getUserById(auth.currentUser.dni));
    }
  }, [dispatch, auth]);

  return (
    <React.Fragment>
      <div className={styles.containerBox}>
        <div className={styles.PanelBox}>
          {
            user && 
              <div key={user.id}>
                {user.is_admin && (
                  <>
                    <img
                      className={styles.pictureUser}
                      src={user.picture}
                      alt="pictureAdm"
                    />
                    <h3 className={styles.data1}>{user.name}</h3>
                    <h3 className={styles.data1}>{user.last_name}</h3>
                    <h3 className={styles.data2} style={{ marginTop: "15px" }}>
                      E-mail: {user.e_mail}
                    </h3>
                    <h3 className={styles.data2}>Phone: {user.phone}</h3>
                  </>
                )}
              </div>
          }
        </div>
        <div className={styles.principalBox}>
          <h3 className={styles.title}>HOME ADMINISTRATOR</h3>
          <div className={styles.buttonBox}>
            <Link to={"/Users"}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-dark my-2"
                style={{ width: "500px" }}
              >
                Users
              </button>
            </Link>
            <Link to={"/CreateTournament"}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-dark my-2"
                style={{ width: "500px" }}
              >
                Create Tournament
              </button>
            </Link>
            <Link to={`/TournamentsToShow`}>
            <button
              type="button"
              className="btn btn-outline-secondary btn-dark my-2"
              style={{ width: "500px" }}
            >
              Create Sub-Tournament
            </button>
            </Link>
            <Link to={"/CreateSponsor"}>
              <button
                type="button"
              className="btn btn-outline-secondary btn-dark my-2"
                style={{ width: "500px" }}
              >
                Create New Sponsor
              </button>
            </Link>
            <Link to={"/Gallery"}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-dark my-2"
                style={{ width: "500px" }}
              >
                Create Gallery
              </button>
            </Link>
            <Link to={"/cpanel"}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-ligth my-2"
                style={{ width: "500px" }}
              >
                Control Panel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeAdmin;
