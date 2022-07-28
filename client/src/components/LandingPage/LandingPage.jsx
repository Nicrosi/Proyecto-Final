import React from "react";
import Carousel from "../ControlledCarousel/ControlledCarousel";
import Footer from "../Footer/Footer";
import Gallery from "../Gallery/Gallery";
import Sponsors from "../Sponsors/Sponsors";
import Steps from "../Steps/Steps";
import TournamentsToShow from "../Tournament/TournamentsToShow/TournamentsToShow";
import { useRef } from "react";
import styles from "./Landing.module.css";

export default function LandingPage() {
  const divRef = useRef();
  return (
    <>
     
      <section>
        <Carousel />
        <button
        className={styles.scrolldown}
        onClick={() => {
          divRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
      </button>
     
     
        
      
      </section>
       <div  ref={divRef}>
      <section
        id="instruction"
        className="d-flex flex-column align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <h1 style={{ marginTop: "100px" }}>How to take part?</h1>
        <Steps />
      </section>
      </div>
      <section
        id="tournamentLP"
      >
        <TournamentsToShow />
      </section>
        <Gallery />
      <section
        id="sponsorLP"
        className="d-flex align-items-center justify-content-center bg-dark"
        style={{ minHeight: "30vh" }}
      >
        <Sponsors />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}
