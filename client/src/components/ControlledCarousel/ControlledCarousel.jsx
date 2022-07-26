import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import img1 from "../../img/imgCarousel1.webp";
import img2 from "../../img/imgCarousel2.webp";

export default function ControlledCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item interval={5000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={img1}
          alt="Second slide"
          style={{ objectFit: "cover", height: "100vh" }}
        />
        <Carousel.Caption
          className="mx-auto align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px", display: "flex",   flexDirection: "column"
        }}
        >
          <h1 style={{fontSize: "3rem"}}>WELCOME</h1>

          <h1>to the</h1>
          <h1>SINNET-TENNIS</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={img2}
          alt="Third slide"
          style={{ objectFit: "cover", height: "100vh" }}
        />
        <Carousel.Caption
          className="mx-auto d-flex flex-column align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px" }}
        >
          <h1 style={{ paddingTop: "70px", fontSize: "2rem", width: "500px" }}>
            "When you lose a couple of times, it makes you realize how difficult
            it is to win"
          </h1>
          <br />
          <h1
            style={{
              textAlign: "end",
              paddingRight: "20px",
              fontSize: "1.3rem",
              width: "500px",
            }}
          >
            -Steffi Graf
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
