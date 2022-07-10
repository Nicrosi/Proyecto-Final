import React from "react";
import Carousel from "../ControlledCarousel/ControlledCarousel";
import { FAQ } from "../FAQ/FAQ";
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
        style={{ minHeight: "100vh", border: "solid 1px black" }}
      >
        <h1 className="mt-4 mb-5">Frequent questions</h1>
        <FAQ/>
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
