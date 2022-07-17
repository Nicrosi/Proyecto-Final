const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Subtournament, conn } = require("../../src/db.js");

const agent = session(app);

const subtournaments = [  
    {
    elimination_type: "Double",
    match_type: "Singles",
    name: "Ladies Singles",
    numb_players: 26,
    gender: "female",
    price: 120,
    id_tournament: 1,
    id_category: 1
  },
  {
    elimination_type: "Double",
    match_type: "Doubles",
    name: "Ladies Dobules",
    numb_players: 52,
    gender: "female",
    price: 200,
    id_tournament: 1,
    id_category: 1
  },
  {
    elimination_type: "Single",
    match_type: "Doubles",
    name: "Men's Doubles",
    numb_players: 52,
    gender: "male",
    price: 200,
    id_tournament: 1,
    id_category: 1
  },
  {
    elimination_type: "Single",
    match_type: "Singles",
    name: "Men's Dobules",
    numb_players: 26,
    gender: "male",
    price: 120,
    id_tournament: 1,
    id_category: 1
  },
  {
    elimination_type: "Double",
    match_type: "Singles",
    name: "Children's Singles",
    numb_players: 26,
    gender: "child",
    price: 100,
    id_tournament: 1,
    id_category: 1
  },
  ];
  

xdescribe("Routes", () => {
before(() =>
    conn.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
    })
);
beforeEach(() => Subtournament.sync({ force: true }));
describe("Create /sub tournament", () => {
    it("add sub tournaments", (done) => {
    subtournaments.forEach((subtournament) => {
        agent
        .post(`/subtournament/1`)
        .send(subtournament)
        .then()
        .catch(() => done(new Error("not added")));
    });
    done();
    });
});
});