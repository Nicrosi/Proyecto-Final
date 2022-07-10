import { Container, Col, Row } from "react-bootstrap";
import spn1 from "../../img/sponsor1.png";
import spn2 from "../../img/sponsor2.png";
import spn3 from "../../img/sponsor3.png";
import spn4 from "../../img/sponsor4.png";
import spn5 from "../../img/sponsor5.png";
import spn6 from "../../img/sponsor6.png";
import spn7 from "../../img/sponsor7.png";
import spn8 from "../../img/sponsor8.png";

const arrSponsors = [spn1, spn2, spn3, spn4, spn5, spn6, spn7, spn8];
export default function Sponsors() {
  return (
    <Container fluid className="py-5">
      <Row className="justify-content-around align-content-around">
        {arrSponsors.map((spn, i) => (
          <Col
            xs={6}
            sm={3}
            lg={1}
            key={i}
            className="d-flex justify-content-center"
          >
            <img src={spn} alt={`${i}`} width={80} height={80} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
