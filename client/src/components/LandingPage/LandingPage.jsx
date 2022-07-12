import React from "react";
import Carousel from "../ControlledCarousel/ControlledCarousel";
import { FAQ } from "../FAQ/FAQ";
import Gallery from "../Gallery/Gallery";
import Sponsors from "../Sponsors/Sponsors";
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
        className="d-flex flex-column align-items-center pt-4 bg-dark"
        style={{ minHeight: "100vh" }}
      >
        <Gallery />
      </section>
      <section
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <h1 className="mt-4 mb-5">Frequent questions</h1>
        <FAQ />
      </section>
      <section
        className="d-flex align-items-center justify-content-center bg-dark"
        style={{ minHeight: "30vh" }}
      >
        <Sponsors />
      </section>
    </>
  );
}
