import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    // <>
    //     <div>
    //       <h1>
    //         TENNIS CHAMPIONSHIP{" "}
    //       </h1>
    //       <div>
    //         <button>
    //           <Link to={"/HomeAdmin"}>Admin</Link>
    //         </button>
    //         <button>
    //           <Link to={"/Players"}>Players</Link>
    //         </button>
    //       </div>
    //     </div>
    // </>

    <nav className="navbar navbar-expand-lg bg-dark position-fixed nav" >
      <div className="container-fluid pe-4">
        <Link className="navbar-brand ps-4" style={{fontWeight: "bold", color: "#A7D129"}} to={"/"}>
          Tennis APP
        </Link>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto pe-4 bg-morning">
            <li className="nav-item">
              <Link
                className="nav-link active ms-auto"
                style={{fontWeight: "bold", color: "#e0e6e8"}}
                aria-current="page"
                to={"/HomeAdmin"}
              >
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link 
              className="nav-link ms-auto"
              style={{fontWeight: "bold", color: "#e0e6e8"}} 
              to={"/Users"}>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
