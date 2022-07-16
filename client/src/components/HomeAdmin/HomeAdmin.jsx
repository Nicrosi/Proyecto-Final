import React from "react";
import styles from "./HomeAdmin.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions";

function HomeAdmin() {
  const users = useSelector((state) => state.rootReducer.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className={styles.containerBox}>
        <div className={styles.PanelBox}>
          {users.map((p, i) => {
            return (
              <div key={i}>
                {p.is_admin && (
                  <>
                    <img
                      className={styles.pictureUser}
                      src={p.picture}
                      alt="pictureAdm"
                    />
                    <h3 className={styles.data1}>{p.name}</h3>
                    <h3 className={styles.data1}>{p.last_name}</h3>
                    <h3 className={styles.data2} style={{ marginTop: "15px" }}>
                      E-mail: {p.e_mail}
                    </h3>
                    <h3 className={styles.data2}>Phone: {p.phone}</h3>
                  </>
                )}
              </div>
            );
          })}
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
            <Link to={"/tournament"}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-dark my-2"
                style={{ width: "500px" }}
              >
                Create Tournament
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-secondary btn-dark my-2"
              style={{ width: "500px" }}
              disabled
            >
              Create Sub-Tournament
            </button>
            <Link to={"/sponsor"}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-dark my-2"
                style={{ width: "500px" }}
              >
                Create New Sponsor
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
