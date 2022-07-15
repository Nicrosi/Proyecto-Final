/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { User, conn } = require("../../src/db.js");

const agent = session(app);

//For test
const users = [
  {
    name: "example1",
    dni: 23442,
    last_name: "a",
    is_admin: true,
    e_mail: "example1@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example2",
    dni: 2344,
    last_name: "a",
    is_admin: false,
    e_mail: "example2@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example3",
    dni: 234,
    last_name: "a",
    is_admin: false,
    e_mail: "example3@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example4",
    dni: 23,
    last_name: "a",
    is_admin: false,
    e_mail: "example4@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example5",
    dni: 231,
    last_name: "a",
    is_admin: false,
    e_mail: "example5@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example6",
    dni: 2311,
    last_name: "a",
    is_admin: false,
    e_mail: "example6@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example7",
    dni: 23111,
    last_name: "a",
    is_admin: false,
    e_mail: "example7@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example8",
    dni: 231111,
    last_name: "a",
    is_admin: false,
    e_mail: "example8@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example9",
    dni: 2311511,
    last_name: "a",
    is_admin: false,
    e_mail: "example9@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example10",
    dni: 2311111,
    last_name: "a",
    is_admin: false,
    e_mail: "example10@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example11",
    dni: 23222,
    last_name: "a",
    is_admin: false,
    e_mail: "example11@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example12",
    dni: 23333,
    last_name: "a",
    is_admin: false,
    e_mail: "example12@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example13",
    dni: 234444,
    last_name: "a",
    is_admin: false,
    e_mail: "example13@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example14",
    dni: 236666,
    last_name: "a",
    is_admin: false,
    e_mail: "example14@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example15",
    dni: 23888,
    last_name: "a",
    is_admin: false,
    e_mail: "example15@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example16",
    dni: 23669,
    last_name: "a",
    is_admin: false,
    e_mail: "example16@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
  {
    name: "example17",
    dni: 234455,
    last_name: "a",
    is_admin: false,
    e_mail: "example17@gmail.com",
    password: "22345",
    phone: 1231,
    num_contact: 2131,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "male",
  },
];

describe("Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => User.sync({ force: true }));
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
  });
});
