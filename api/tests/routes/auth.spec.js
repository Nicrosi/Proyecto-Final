/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { User, conn } = require("../../src/db.js");
const { faker } = require('@faker-js/faker');
const agent = session(app);

const cantUser = 100
const cantScore = 80
//For test
const users = [];
const score = [];


for(i=0; i <= cantUser; i++){
  users.push({
    name: faker.name.firstName(i % 2===0? "male":"female"),
    dni: i,
    last_name: faker.name.lastName(),
    is_admin: false,
    e_mail: `example${i}@gmail.com`,
    password: "example"+i,
    phone: 8888+i,
    num_contact: 8889+i,
    picture:
    faker.image.image(640,480,true),
    gender: i % 2===0? "male":"female",
  })
}

for(i=0; i <= cantScore; i++){
  score.push({
    previous_tournaments: Math.floor(Math.random() * 5) + 1,
    hit_knowledge: Math.floor(Math.random() * 5) + 1,
    other_strokes: Math.floor(Math.random() * 5) + 1,
    special_hits: Math.floor(Math.random() * 5) + 1,
    kick_serve_control: Math.floor(Math.random() * 5) + 1,
    game_strategy: Math.floor(Math.random() * 5) + 1,
  })
}


describe("Routes", () => {
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
      users.slice(0,79).forEach((user,index) => {
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
