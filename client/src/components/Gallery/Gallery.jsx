import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios';
import './Gallery.css';
import { Link } from "react-router-dom";


export default function Gallery() {

  const [ImagesList, setImagesList ] = useState([]);
  const Gallery = ImagesList.length >= 9 ? [...ImagesList.slice(0, 9)] : [...ImagesList];

  useEffect(() => {
    axios.get('http://localhost:3001/gallery/get',)
    .then(res => setImagesList(res.data))
    .catch(err => console.log(err))

    return () => {
      axios.delete('http://localhost:3001/gallery/delete')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    }

  },[])

  return (
    <>
    {
      ImagesList.length ?
      (
        <section
          id="multimediaLP"
          className="d-flex flex-column align-items-center pt-4 bg-dark"
          style={{ minHeight: "100vh" }}
        >
          <Container fluid>
            <div className="container_galery_images" >
              <>
                {
                  Gallery.length && Gallery.map((image) => (
                    <img
                      src={`http://localhost:3001/${image}`}
                      className="gallery_image"
                      alt="Boat on Calm Water"
                    />            
                  ))
                }
              </>
            </div> 
            <Link to='/Gallery'>
              <button
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "3rem",
                  marginLeft: "43vw",
                  color: "#A7D129",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent"
                }}
              >
                Watch more
              </button>
            </Link>
          </Container>

        </section>
      )
      :
      (<div></div>)
    }
      {/* <Row>
        <Col md={4} sm={4}>
          <img
            src={`http://localhost:3001/${ImagesList[0]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={`http://localhost:3001/${ImagesList[1]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>

        <Col md={4} sm={4}>
          <img
            src={`http://localhost:3001/${ImagesList[2]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={`http://localhost:3001/${ImagesList[3]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>

        <Col md={4} sm={4}>
          <img
            src={`http://localhost:3001/${ImagesList[4]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={`http://localhost:3001/${ImagesList[5]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>
      </Row> 
    </Container>{/* <Row>
        <Col md={4} sm={4}>
          <img
            src={`http://localhost:3001/${ImagesList[0]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={`http://localhost:3001/${ImagesList[1]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>

        <Col md={4} sm={4}>
          <img
            src={`http://localhost:3001/${ImagesList[2]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={`http://localhost:3001/${ImagesList[3]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>

        <Col md={4} sm={4}>
          <img
            src={`http://localhost:3001/${ImagesList[4]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
          <img
            src={`http://localhost:3001/${ImagesList[5]}`}
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </Col>
      </Row> 
    </Container>*/}
    </>
  );
}
