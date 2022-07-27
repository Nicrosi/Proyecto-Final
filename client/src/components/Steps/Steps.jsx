import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Steps.css";
import step1 from "../../img/step1.png";
import step2 from "../../img/step2.png";
import step3 from "../../img/step3.png";
import step5 from "../../img/step5.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Steps() {
  const { dni } = useSelector((state) => state.auth.currentUser);
  return (
    <Row
      className="d-flex align-items-center justify-content-around pb-5"
      style={{ width: "100%", minHeight: "inherit" }}
    >
      <Col
        lg={3}
        xxl={2}
        className="d-flex flex-column align-items-center mt-4"
      >
        <div className="step">
          <img src={step1} alt="step1" />
          <h4>Sign up</h4>
          <div className="info">
            <p>
              The first step is the register, you can click on the button below
              to start.
            </p>
          </div>

          <Link to={"/LogIn"}>
            <button>Join Now</button>
          </Link>
        </div>
      </Col>
      <Col
        lg={3}
        xxl={2}
        className="d-flex flex-column align-items-center mt-4"
      >
        <div className="step ">
          <img src={step3} alt="step1" />
          <h4>Fill your skills</h4>
          <div className="info">
            <p>
              The second step is fill yours skills in your profile. Then a
              category will be assigned.
            </p>
          </div>
          <Link to={`/Profile/${dni}`}>
            <button>Fill Now</button>
          </Link>
        </div>
      </Col>
      <Col
        lg={3}
        xxl={2}
        className="d-flex flex-column align-items-center mt-4"
      >
        <div className="step ">
          <img src={step2} alt="step1" />
          <h4>Inscription</h4>
          <div className="info">
            <p>
              The third step is to sign up for a subtournament, choose the one
              you prefer.
            </p>
          </div>
          <button>
            <a className="nav-link" href="/#tournamentLP  ">
              Tournaments
            </a>
          </button>
        </div>
      </Col>

      <Col
        lg={3}
        xxl={2}
        className="d-flex flex-column align-items-center mt-4"
      >
        <div className="step ">
          <img src={step5} alt="step1" />
          <h4>Win!</h4>
          <div className="info">
            <p>
              Wait for the tournament to start, you can see details of it below.
            </p>
          </div>
          <Link to={"/LogIn"}>
            <button>Play</button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
