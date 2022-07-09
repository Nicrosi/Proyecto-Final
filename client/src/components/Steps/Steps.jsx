import React from "react";
import { Row, Col } from "react-bootstrap";

export default function Steps() {
  return (
    <Row
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100%", height: "400px" }}
    >
      <Col sm className="d-flex flex-column align-items-center">
        <div
          style={{
            color: "white",
            width: "60px",
            height: "60px",
            backgroundColor: "black",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          <h1>1</h1>
        </div>
        <p>Sign in</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <div
          style={{
            color: "white",
            width: "60px",
            height: "60px",
            backgroundColor: "black",
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <h1>2</h1>
        </div>
        <p>Inscription</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <div
          style={{
            color: "white",
            width: "60px",
            height: "60px",
            backgroundColor: "black",
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <h1>3</h1>
        </div>
        <p>Tell us about your skills</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <div
          style={{
            color: "white",
            width: "60px",
            height: "60px",
            backgroundColor: "black",
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <h1>4</h1>
        </div>
        <p>Choose a subtournament</p>
      </Col>
      <Col sm className="d-flex flex-column align-items-center">
        <div
          style={{
            color: "white",
            width: "60px",
            height: "60px",
            backgroundColor: "black",
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <h1>5</h1>
        </div>
        <p>WIN!</p>
      </Col>
    </Row>
  );
}
