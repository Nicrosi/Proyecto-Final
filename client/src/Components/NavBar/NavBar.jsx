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

    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Tennis APP
        </Link>
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/HomeAdmin"}>
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/Players"}>
                Players
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
