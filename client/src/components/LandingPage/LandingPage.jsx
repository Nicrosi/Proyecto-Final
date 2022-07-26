import React from "react";
import Carousel from "../ControlledCarousel/ControlledCarousel";
import Gallery from "../Gallery/Gallery";
import Sponsors from "../Sponsors/Sponsors";
import Steps from "../Steps/Steps";
import TournamentsToShow from "../Tournament/TournamentsToShow/TournamentsToShow";

export default function LandingPage() {
  return (
    <>
      <section>
        <Carousel />
      </section>
      <section
        id="instruction"
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <h1 className="mt-4 ">How to take part?</h1>
        <Steps />
      </section>
      <Gallery />
      <section
        id="tournamentLP"
      >
        <TournamentsToShow />
      </section>
      <section
        id="sponsorLP"
        className="d-flex align-items-center justify-content-center bg-dark"
        style={{ minHeight: "30vh" }}
      >
        <Sponsors />
      </section>
    </>
  );
}
