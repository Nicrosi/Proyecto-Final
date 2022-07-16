const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Category, conn } = require("../../src/db.js");

const agent = session(app);

const categories = [
    {
      type: "a",
    },
    {
        type: "b",
      },
      {
        type: "c",
      },
      {
        type: "e",
      },
  ];

xdescribe("Routes", () => {
before(() =>
    conn.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
    })
);
beforeEach(() => Category.sync({ force: true }));
describe("Create /category", () => {
    it("add categories", (done) => {
    categories.forEach((category) => {
        agent
        .post(`/category`)
        .send(category)
        .then()
        .catch(() => done(new Error("not added")));
    });
    done();
    });
});
});
  