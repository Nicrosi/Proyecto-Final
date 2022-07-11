import { Container, Col, Row } from "react-bootstrap";
import img1 from "../../img/imgGallery1.webp";
import img2 from "../../img/imgGallery2.webp";
import img3 from "../../img/imgGallery3.webp";
import img4 from "../../img/imgGallery4.webp";
import img5 from "../../img/imgGallery5.webp";
import img6 from "../../img/imgGallery6.webp";

export default function Gallery() {
  return (
    <Container fluid>
      <Row>
        <Col md={4} sm={4}>
          <img
            src={img6}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={img4}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>

        <Col md={4} sm={4}>
          <img
            src={img1}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={img5}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>

        <Col md={4} sm={4}>
          <img
            src={img3}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={img2}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>
      </Row>
    </Container>
  );
}
