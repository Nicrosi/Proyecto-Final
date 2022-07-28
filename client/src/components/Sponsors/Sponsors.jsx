import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllSponsors } from "../../redux/actions";

export default function Sponsors() {
  const dispatch = useDispatch(),
    sponsors = useSelector((state) => state.rootReducer.sponsors);

  useEffect(() => {
    dispatch(getAllSponsors());
  }, [dispatch]);

  return (
    <Container fluid className="py-5 d-flex align-items-center justify-content-center bg-dark">
      {sponsors.length > 0 ? (
        <Row className="justify-content-around align-content-around">
          {sponsors.map((spn, i) => (
            <Col
              xs={6}
              sm={3}
              lg={1}
              key={i}
              className="d-flex justify-content-center"
              style={{justifyContent: "space-between", margin: "0 2vw", width: "fit-content" }}
            >
              <a href={spn.link} target="_blank" rel="noreferrer">
                <img
                  src={spn.logo}
                  alt={`${i}`}
                  style={{ maxHeight: "120px", width: "auto" }}
                />
              </a>
            </Col>
          ))}
        </Row>
      ) : (
        <h1 className="text-white" style={{ textAlign: "center" }}>
          No sponsors found!
        </h1>
      )}
    </Container>
  );
}
