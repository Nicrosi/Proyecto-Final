import React from "react";
import Carousel from "../ControlledCarousel/ControlledCarousel";
import Gallery from "../Gallery/Gallery";
import Steps from "../Steps/Steps";

export default function LandingPage() {
  return (
    <>
      <section>
        <Carousel />
      </section>
      <section
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <h1 className="mt-4 ">How to take part?</h1>
        <Steps />
      </section>
      <section
        className="d-flex flex-column align-items-center pt-4"
        style={{ minHeight: "100vh", backgroundColor: "#232323" }}
      >
        <Gallery />
      </section>
      <section
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "30vh" }}
      ></section>
    </>
  );
}
