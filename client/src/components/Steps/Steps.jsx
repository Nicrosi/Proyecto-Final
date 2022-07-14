import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Steps.css";
import step1 from "../../img/step1.png";
import step2 from "../../img/step2.png";
import step3 from "../../img/step3.png";
import step4 from "../../img/step4.png";
import step5 from "../../img/step5.png";
import { Link } from "react-router-dom";

export default function Steps() {
  return (
    <Row
      className="d-flex align-items-center justify-content-center pb-5 "
      style={{ width: "100%", minHeight: "inherit" }}
    >

      <Col lg={3} className="d-flex flex-column align-items-center mt-5">
        <div className="step">
          <img src={step1} alt="step1" />
          <h4>Sign in</h4>
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
      <Col lg={3} className="d-flex flex-column align-items-center mt-5">
        <div className="step ">
          <img src={step2} alt="step1" />
          <h4>Inscription</h4>
          <div className="info">
            <p>
              The second step is the register, you can click on the button below
              to start.
            </p>
          </div>
          <Link to={"/LogIn"}>
          <button>Join Now</button>
          </Link>
        </div>
      </Col>
      <Col lg={3} className="d-flex flex-column align-items-center mt-5">
        <div className="step ">
          <img src={step3} alt="step1" />
          <h4>Fill your skills</h4>
          <div className="info">
            <p>
              The third step is the register, you can click on the button below
              to start.
            </p>
          </div>
          <Link to={"/LogIn"}>
          <button>Join Now</button>
          </Link>
        </div>
      </Col>
      <Col lg={3} className="d-flex flex-column align-items-center mt-5">
        <div className="step ">
          <img src={step4} alt="step1" />
          <h4>Subtournaments</h4>
          <div className="info">
            <p>
              The fourth step is the register, you can click on the button below
              to start.
            </p>
          </div>
          <Link to={"/LogIn"}>
          <button>Join Now</button>
          </Link>
        </div>
      </Col>
      <Col lg={3} className="d-flex flex-column align-items-center mt-5">
        <div className="step ">
          <img src={step5} alt="step1" />
          <h4>Win!</h4>
          <div className="info">
            <p>
              The fifth step is the register, you can click on the button below
              to start.
            </p>
          </div>
          <Link to={"/LogIn"}>
          <button>Join Now</button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
