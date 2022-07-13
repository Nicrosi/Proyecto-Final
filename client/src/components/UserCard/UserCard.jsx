import React from "react";
import { Link } from "react-router-dom";

export const UserCard = ({
  dni,
  name,
  last_name,
  picture,
  gender,
  category,
}) => {
  return (
    <Link
      to={`/Users/${dni}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="card shadow-lg">
        <div className="d-flex flex-column flex flex-md-row flex-lg-row">
          <div className="col-md-5">
            <img
              className="rounded-start"
              src={picture}
              alt="img"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{`${name} ${last_name}`}</h5>
              <p className="card-text mt-2 mb-0">Gender: {gender}</p>
              {category ? (
                <p className="card-text">Category: {category.type}</p>
              ) : (
                <p className="card-text">Category: None</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
