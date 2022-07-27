import React from "react";
import styles from "./UserCard.module.css";


export const UserCard = ({ user, setDataModal}) => {
  function handleOpenDetail(e) { 
    e.preventDefault();
    setDataModal(user);
  }

  return (
      <div className={`card ${styles.card}`} style={{ height: "100%" }}  data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
      onClick={(e)=>handleOpenDetail(e)}>
        <div
          className="d-flex flex flex-md-row flex-lg-row"
          style={{ height: "100%" }}
        >
          <div className={`${styles.pictureContainer} col-md-5 col-sm-3`}>
            <img
              className={`${styles.picture} rounded-start`}
              src={user.picture}
              alt="img"
            />
          </div>
          <div className="col-md-7 col-sm-5">
            <div className="card-body">
              <h5 className="card-title">{`${user.name} ${user.last_name}`}</h5>
              <p className="card-text mt-2 mb-0">Gender: {user.gender}</p>
              {user.category ? (
                <p className="card-text">Category: {user.category.type}</p>
              ) : (
                <p className="card-text">Category: None</p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};
