import React from "react";
import { Row, Col } from "react-bootstrap";
import ball1 from "../../img/ball1.png";
import ball2 from "../../img/ball2.png";
import ball3 from "../../img/ball3.png";
import ball4 from "../../img/ball4.png";
import ball5 from "../../img/ball5.png";

export default function Steps() {
  return (
    <Row
      className="d-flex align-items-center justify-content-center pb-5 "
      style={{ width: "100%", minHeight: "inherit" }}
    >
      <Col sm className="d-flex flex-column align-items-center" >
        <img src={ball1} width={100} alt="ball1" />
        <p>Sign in</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <img src={ball2} width={100} alt="ball2" />
        <p>Inscription</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <img src={ball3} width={100} alt="ball3" />
        <p>Tell us about your skills</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <img src={ball4} width={100} alt="ball4" />
        <p>Choose a subtournament</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <img src={ball5} width={100} alt="ball5" />
        <p>WIN!</p>
      </Col>
    </Row>
  );
}
