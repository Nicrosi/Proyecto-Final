import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import img1 from "../../img/imgCarousel1.webp";
import nadal from "../../img/nadal.webp";
import roger from "../../img/roger.jpeg";
import roger2 from "../../img/roger2.webp";
import roger3 from "../../img/roger3.jpg";
import roger4 from "../../img/roger4.jpg";
import logo from "../../img/SYNNET_icon.png";

export default function ControlledCarousel() {
  return (
    <Carousel fade>
       <Carousel.Item interval={5000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={roger4}
          alt="Second slide"
          style={{ objectFit: "cover", height: "100vh" }}
        />
        <Carousel.Caption
          className="mx-auto align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px", display: "flex",   flexDirection: "column"
        }}
        >
          <h1 style={{fontSize: "2rem",   fontFamily: "'Bebas Neue', cursive"}}>WELCOME</h1>
          <h1 style={{fontSize: "1.5rem",   lineHeight: "0.5", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>to the</h1>
          <img src={logo} alt="logoSynnet" style={{width: "300px"}} />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={roger}
          alt="Second slide"
          style={{ objectFit: "cover", height: "100vh" }}
        />
        <Carousel.Caption
          className="mx-auto align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px", display: "flex",   flexDirection: "column"
        }}
        >
          <h1 style={{fontSize: "2rem",   fontFamily: "'Bebas Neue', cursive"}}>WELCOME</h1>
          <h1 style={{fontSize: "1.5rem",   lineHeight: "0.5", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>to the</h1>
          <img src={logo} alt="logoSynnet" style={{width: "300px"}} />
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={roger2}
          alt="Second slide"
          style={{ objectFit: "cover", height: "100vh" }}
        />

<Carousel.Item interval={4000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={img1}
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
        <Carousel.Caption
          className="mx-auto align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px", display: "flex",   flexDirection: "column"
        }}
        >
          <h1 style={{fontSize: "2rem",   fontFamily: "'Bebas Neue', cursive"}}>WELCOME</h1>
          <h1 style={{fontSize: "1.5rem",   lineHeight: "0.5", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>to the</h1>
          <img src={logo} alt="logoSynnet" style={{width: "300px"}} />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={roger3}
          alt="Second slide"
          style={{ objectFit: "cover", height: "100vh" }}
        />
        <Carousel.Caption
          className="mx-auto align-items-center justify-content-center"
          style={{ height: "100%", paddingTop: "70px", display: "flex",   flexDirection: "column"
        }}
        >
          <h1 style={{fontSize: "2rem",   fontFamily: "'Bebas Neue', cursive"}}>WELCOME</h1>
          <h1 style={{fontSize: "1.5rem",   lineHeight: "0.5", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>to the</h1>
          <img src={logo} alt="logoSynnet" style={{width: "300px"}} />
        </Carousel.Caption>
      </Carousel.Item>
     
      <Carousel.Item interval={4000} className="carouselItem">
        <Image
          className="d-block w-100"
          src={nadal}
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
