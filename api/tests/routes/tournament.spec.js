const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Tournament, conn } = require("../../src/db.js");

const agent = session(app);

const tournament = [
    {
      name: "Torneo One",
      date: "03/04/2023",
      location: "Cunningham Palace"
    }
  ];

xdescribe("Routes", () => {
before(() =>
    conn.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
    })
);
beforeEach(() => Tournament.sync({ force: true }));
describe("Create /tournament", () => {
    it("add tournaments", (done) => {
    tournament.forEach((tournament) => {
        agent
        .post(`/tournament`)
        .send(tournament)
        .then()
        .catch(() => done(new Error("not added")));
    });
    done();
    });
});
});
  