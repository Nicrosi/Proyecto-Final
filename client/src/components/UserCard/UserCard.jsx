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
    // <div className="mx-4 my-4">
    //   <div className="card mx-4 my-3 shadow-lg" style={{ width: "40rem" }}>
    //     <div className="row">
    //       <div className="col">
    //         <Link to={`/Users/${dni}`}>
    //           <img className="col align-self-center " src={picture} alt="img" />
    //         </Link>
    //       </div>

    //       <div className="col">
    //         <h3 className="text-muted">User: {`${name} ${last_name}`}</h3>
    //         <h3 className="col text-italic">Gender: {gender}</h3>
    //         {
    //         category ?
    //           <h3 className="col ">Category: {category.type}</h3>
    //          :
    //           <h3 className="col ">Category: No Category</h3>
    //         }
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="card mb-3 mx-4 my-3 shadow-lg" style={{ width: "auto" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={`/Users/${dni}`}>
            <img className="img-fluid rounded-start" src={picture} alt="img" />
          </Link>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">User: {`${name} ${last_name}`}</h5>
            <h5 className="card-text">Gender: {gender}</h5>
            {category ? (
              <h5 className="col ">Category: {category.type}</h5>
            ) : (
              <h5 className="col ">Category: No Category</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
