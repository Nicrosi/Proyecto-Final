import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authorization";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { loggedIn, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark position-fixed nav">
      <div className="container-fluid px-4 d-flex justify-content-between">
        <Link className={`${styles.title} navbar-brand`} to="/">
          Tennis APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {loggedIn ? (
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
            {loggedIn && currentUser.is_admin === false ? (
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
          <ul className="navbar-nav">
            {loggedIn ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="1"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={currentUser.picture}
                    width="30"
                    height="30"
                    className="rounded-circle"
                    alt="profileImg"
                  />
                </a>
                <ul
                  className={`dropdown-menu dropdown-menu-dark ${styles.dropMenu}`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    {currentUser.is_admin ? (
                      <Link className="dropdown-item" to="/HomeAdmin">
                        Admin
                      </Link>
                    ) : null}
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/profile/${currentUser.dni}`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className={`dropdown-item ${styles.btnLogout} py-0`}
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
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

{
  /* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto pe-2 bg-morning">
            {auth.loggedIn ? (
              <>
                <li>
                  <img
                    src={auth.currentUser.picture}
                    width="30"
                    height="30"
                    className="rounded-circle"
                    alt="profileImg"
                  />
                </li>
                <li>
                  <NavDropdown id="basic-nav-dropdown">
                    {auth.currentUser.is_admin ? (
                      <NavDropdown.Item href="/HomeAdmin">
                        Admin
                      </NavDropdown.Item>
                    ) : <NavDropdown.Item href={`/profile/${auth.currentUser.dni}`}>
                    Profile
                  </NavDropdown.Item>}
                    <NavDropdown.Item>
                      <NavDropdown.Item href=""

                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                      >
                        Logout
                        </NavDropdown.Item>
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
        </div> */
}

{
  /* <nav className="navbar navbar-expand-lg bg-dark navbar-dark position-fixed nav">
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
          <li className="nav-item dropdown">
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
          </li>
        </ul>
      </div>
    </nav> */
}
