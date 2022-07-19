import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllSponsors } from "../../redux/actions";

export default function Sponsors() {
  const dispatch = useDispatch(),
    sponsors = useSelector((state) => state.rootReducer.sponsors);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(getAllSponsors());
=======

      dispatch(getAllSponsors());

>>>>>>> 0793d044ec29cc3811c0601e166a0035ebbfd3ad
  }, [dispatch]);

  return (
    <Container fluid className="py-5">
      {sponsors.length > 0 ? (
        <Row className="justify-content-around align-content-around">
          {sponsors.map((spn, i) => (
            <Col
              xs={6}
              sm={3}
              lg={1}
              key={i}
              className="d-flex justify-content-center"
              style={{ width: "fit-content" }}
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
