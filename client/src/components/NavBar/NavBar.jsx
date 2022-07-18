import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authorization";

import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

    <nav className="navbar navbar-expand-lg bg-dark navbar-dark position-fixed nav">
      <div className="container-fluid pe-4">
        <Link
          className="navbar-brand ps-4"
          style={{ fontWeight: "bold", color: "#A7D129" }}
          to={"/"}
        >
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
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto pe-4 bg-morning">
          {auth.loggedIn ? (
            <li className="nav-item">
              <Link
                className="nav-link ms-auto"
                style={{ fontWeight: "bold", color: "#e0e6e8" }}
                to={"/Users"}
              >
                Users
              </Link>
            </li>
          ) : null}
          {auth.loggedIn && auth.currentUser.is_admin === false ? (
            <li className="nav-item">
              <Link
                className="nav-link ms-auto"
                style={{ fontWeight: "bold", color: "#e0e6e8" }}
                to={"/Users"}
              >
                Inscription
              </Link>
            </li>
          ) : null}
          <li className="nav-item">
            <a
              className="nav-link ms-auto"
              style={{ fontWeight: "bold", color: "#e0e6e8" }}
              href="/#multimediaLP"
            >
              Multimedia
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link ms-auto"
              style={{ fontWeight: "bold", color: "#e0e6e8" }}
              href="/#sponsorLP"
            >
              Sponsor
            </a>
          </li>
        </ul>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto pe-2 bg-morning">
            {auth.loggedIn ? (
              <>
                <li className="d-flex justify-content-center align-items-center">
                  <img
                    src={auth.currentUser.picture}
                    width="30"
                    height="30"
                    className="rounded-circle"
                    alt="profileImg"
                  />
                </li>
                <li>
                  <NavDropdown
                    id="basic-nav-dropdown"
                    style={{ paddingTop: "2px" }}
                  >
                    {auth.currentUser.is_admin ? (
                      <Link className="dropdown-item" to="/HomeAdmin">
                        Admin
                      </Link>
                    ) : null}
                    <Link
                      className="dropdown-item"
                      to={`/profile/${auth.currentUser.dni}`}
                    >
                      Profile
                    </Link>
                    <NavDropdown.Item>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          padding: "0",
                        }}
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                      >
                        Logout
                      </button>
                    </NavDropdown.Item>
                  </NavDropdown>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link ms-auto"
                    style={{ fontWeight: "bold", color: "#e0e6e8" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link ms-auto"
                    style={{ fontWeight: "bold", color: "#e0e6e8" }}
                    to={"/SignIn"}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
