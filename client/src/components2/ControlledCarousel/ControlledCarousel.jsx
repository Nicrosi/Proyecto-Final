import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import img1 from "../../img/imgCarousel1.webp";
import img2 from "../../img/imgCarousel2.webp";

export default function ControlledCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item interval={1000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={img1}
          alt="Second slide"
          style={{ objectFit: "cover", height: "100vh" }}
        />
        <Carousel.Caption
          className="mx-auto d-flex align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px" }}
        >
          <h1>Welcome to the Tennis app</h1>
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
          className="mx-auto d-flex align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px" }}
        >
          <h1>
            "When you lose a couple of times, it makes you realize how difficult
            it is to win -Steffi Graf"
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
