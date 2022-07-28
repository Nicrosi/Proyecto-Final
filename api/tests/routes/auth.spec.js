/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { User, Tournament, Subtournament,Inscription, conn } = require("../../src/db.js");
const { faker } = require("@faker-js/faker");
const agent = session(app);
/////////////////////////////////users
const cantUser = 100;
const cantScore = 80;
//For test
const users = [];
const score = [];

for (i = 0; i <= cantUser; i++) {
  users.push({
    name: "Name" + i,
    dni: i+2, ///para que no choque con el del admin id
    last_name: "Lastname" + i,
    is_admin: false,
    e_mail: `example${i}@gmail.com`,
    password: "example" + i,
    phone: 8888 + i,
    num_contact: 8889 + i,
    picture: faker.image.image(640, 480, true),
    gender: i % 2 === 0 ? "male" : "female",
  });
}

for (i = 0; i <= cantScore; i++) {
  score.push({
    previous_tournaments: Math.floor(Math.random() * 5) + 1,
    hit_knowledge: Math.floor(Math.random() * 5) + 1,
    other_strokes: Math.floor(Math.random() * 5) + 1,
    special_hits: Math.floor(Math.random() * 5) + 1,
    kick_serve_control: Math.floor(Math.random() * 5) + 1,
    game_strategy: Math.floor(Math.random() * 5) + 1,
  });
}

////////////////////////////torneo
const tournament = [
  {
    name: "Torneo One",
    date: "03/04/2023",
    location: "Cunningham Palace",
  },
];

//////////////////////////subtorneos

const cantSubt = 4;

const subtournaments = [];

const cant_players = [4, 8, 16];

for (i = 0; i < cantSubt; i++) {
  subtournaments.push({
    elimination_type: "Simple",
    match_type: "Singles",
    name: "subTournament test " + i,
    numb_players: cant_players[Math.floor(Math.random() * 3)],
    gender: i % 2 == 0 ? "female" : "male",
    price: Math.floor(Math.random() * 200) + 100,
    id_tournament: 1,
    id_category: i + 1,
  });
}


xdescribe("RoutesUser", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => User.sync({ force: false }));
  describe("Register /auth", () => {
    it("add users", (done) => {
      users.forEach((user) => {
        agent
          .post(`/auth/register`)
          .send(user)
          .then()
          .catch(() => done(new Error("not added")));
      });
      done();
    });
    it("add score", (done) => {
      users.slice(0, 79).forEach((user, index) => {
        agent
          .post(`/score/${user.dni}`)
          .send(score[index])
          .then()
          .catch(() => done(new Error("not added")));
      });
      done();
    });
  });
});

xdescribe("RoutesTournament", () => {
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

xdescribe("RoutesSubtournament", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Subtournament.sync({ force: false }));
  describe("Create /sub subtournament", () => {
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

module.exports = {users, subtournaments}