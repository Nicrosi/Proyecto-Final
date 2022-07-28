import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, urlAuth } from "../../redux/actions/authorization";
import styles from "./NavBar.module.css";
import logo from "../../img/SYNNET_icon.png";


export default function NavBar() {
  const { loggedIn, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    window.open(urlAuth + "/login/google/logout", "_self");
    dispatch(logoutUser());
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark position-fixed nav">
      <div className="container-fluid px-4 d-flex justify-content-between">
        <Link className={`${styles.title} navbar-brand`} to="/">
        <img src={logo} alt="logoSynnet" style={{width: "140px"}} />
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
              <li className="nav-item">
                 <a
                className="nav-link ms-auto"
                style={{ fontWeight: "bold", color: "#e0e6e8" }}
                href="/#tournamentLP  "
              >
                Tournament
              </a>
              </li>
            <li className="nav-item">
              {/* <a
                className="nav-link ms-auto"
                style={{ fontWeight: "bold", color: "#e0e6e8" }}
                href="/Gallery"
              >
                Multimedia
              </a> */}
              <Link 
                className="nav-link ms-auto"
                style={{ fontWeight: "bold", color: "#e0e6e8" }}
                to='/Gallery'
              >
                Multimedia
              </Link>
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
                      onClick={handleLogout}
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
