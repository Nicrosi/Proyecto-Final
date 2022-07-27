const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Subtournament, conn } = require("../../src/db.js");

const agent = session(app);

const cantSubt=5;

const subtournaments = [];
  
const eliminations = ["Allvsall","Double","Simple"]

for(i=0; i <= cantSubt; i++){
  subtournaments.push({
    elimination_type: eliminations[Math.floor(Math.random() * 3)],
    match_type: i%2==0?"Singles":"Dobles",
    name: "subTournament test"+i,
    numb_players: 12,
    gender: i%2==0?"female":"male",
    price: Math.floor(Math.random() * 200) + 100,
    id_tournament: 1,
    id_category: `${Math.floor(Math.random() * 4) + 1}`
  })
}

  

xdescribe("Routes", () => {
before(() =>
    conn.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
    })
);
beforeEach(() => Subtournament.sync({ force: false }));
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