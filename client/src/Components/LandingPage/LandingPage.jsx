import React from "react";
import Carousel from "../ControlledCarousel/ControlledCarousel";
/* import Gallery from "../Gallery/Gallery";
import Steps from "../Steps/Steps"; */

export default function LandingPage() {
  return (
    <>
      <section>
        <Carousel />
      </section>
      {/* <section
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "75vh" }}
      >
        <h1 className="mt-4 ">How to take part?</h1>
        <Steps />
      </section> */}
      <section
        className="d-flex flex-column align-items-center bg-secondary"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="mt-4 mb-5">Participants</h1>
      </section>
      <section
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "100vh", border: "solid 1px black" }}
      >
        <h1 className="mt-4 mb-5">Galery</h1>
        <Gallery />
      </section>
      <section
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "100vh", border: "solid 1px black" }}
      >
        <h1 className="mt-4 mb-5">Frequent questions</h1>
      </section>
      <section
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "100vh", border: "solid 1px black" }}
      >
        <h1 className="mt-4 mb-5">Sponsors</h1>
      </section>
    </>
  );
}
