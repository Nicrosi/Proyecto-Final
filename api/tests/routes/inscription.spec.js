const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { User, Tournament, Subtournament,Inscription, conn } = require("../../src/db.js");
const { faker } = require("@faker-js/faker");
const agent = session(app);
 const {users,subtournaments } =  require("./auth.spec");

//////////////////inscriptions




const inscriptions = [];
for (i = 0; i < cantSubt; i++) {
  //cant de subt para llenar los subt
  // for(j=0; j< cantUser; j++)
  // if(subtournaments[i].gender === users[j].gender && subtournaments[i].id_category === users[j].id_category ){
  // }

  let usersBySubt = users.filter((u) => {
    return (
      u.gender === subtournaments[i].gender &&
      subtournaments[i].id_category === u.id_category
    );
  });
  if (usersBySubt.length > subtournaments[i].numb_players) {
    usersBySubt = usersBySubt.slice(0, numb_players);
  }

  for (j = 0; j < usersBySubt; j++) {
    inscriptions.push({
      description: "test description",
      amount: subtournaments[i].price,
      is_payed: true,
      id_user: usersBySubt[j].dni, /// para que sirve no puede haber ni un solo user registrado, solo el admin
      id_tournament: "1",
      id_subt: `${i+1}`,
    });
  }
}
/////////////
xdescribe("RoutesInscription", () => {
    before(() =>
      conn.authenticate().catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
    );
    beforeEach(() => Inscription.sync({ force: false }));
    describe("Create Inscription", () => {
      it("add Inscription", (done) => {
        inscriptions.forEach((inscription) => {
          agent
            .post(`inscription/test/${inscription.id_user}`)
            .send(inscription)
            .then()
            .catch(() => done(new Error("not added")));
        });
        done();
      });
    });
  });
  