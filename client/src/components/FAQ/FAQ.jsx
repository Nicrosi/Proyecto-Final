import React from "react";
//hola
export const FAQ = () => {
  return (
    <>
      <div
        className="accordion  my-4"
        id="accordionExample"
        style={{ minWidth: "75%", maxWidth: "75%", border: "solid 1px black" }}
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Question #1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Do I have to be an expert player to sign up for a tournament
              </strong>
              You do not have to be an expert, you just have to complete your
              profile to know in which category and tournament you can complete
              your register.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Question #2
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                there are age limits to play in category A tournaments
              </strong>
              There are no age limitations. You just have to demonstrate your
              technical and tactical knowledge of the game. try to be as
              objective as possible in your definition of scores so that the
              tournament is fair for the players.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Question #3
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                If I enter a tournament and lose in the first round, am I
                disqualified and only play one match? .
              </strong>{" "}
              Depending on the number of players, it will be defined what type
              of tournament is established, a_ all against all, b_ single
              elimination or double elimination
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
