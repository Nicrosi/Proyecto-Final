import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import './Gallery.css';
import img1 from "../../img/imgGallery1.webp";
import img2 from "../../img/imgGallery2.webp";
import img3 from "../../img/imgGallery3.webp";
import img4 from "../../img/imgGallery4.webp";
import img5 from "../../img/imgGallery5.webp";
import img6 from "../../img/imgGallery6.webp";

export default function Gallery() {

  const [ImagesList, setImagesList ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/images/prueba',)
    .then(res => res.json())
    .then(res => setImagesList(res))
    .catch(err => console.log(err))
    
    return () => {
      fetch('http://localhost:3001/images/prueba/delete')
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  },[])

  return (
    <>
    {
      ImagesList.length ?
      (<Container fluid>
        <div className="container_galery_images" >
          <>
            {
              ImagesList.length && ImagesList.map((image) => (
                <img
                  src={`http://localhost:3001/${image}`}
                  className="gallery_image"
                  alt="Boat on Calm Water"
                />            
              ))
            }
            </>
        </div> 
      </Container>)
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
