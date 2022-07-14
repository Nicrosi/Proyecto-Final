let Category = "";
let Gender = "";
// verificacion entre los inscriptos que user === team o que 2 user sean parte de un team
const numberOfTeams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numberOfRounds = Math.floor(Math.sqrt(numberOfTeams.length));
console.log("rounds", numberOfRounds);
export default function SimplElTournament() {
  if (Math.sqrt(numberOfRounds) >= numberOfTeams.length) {
    const numberOfBye = Math.sqrt(numberOfRounds) - numberOfTeams.length;
    console.log("bye", numberOfBye);
    const roundQualy = numberOfTeams.length - numberOfBye;

    for (let i = 1; i <= roundQualy; i++) {
      let arrayQualy = [];
      let sortedArraytoo = arrayQualy.sort(() => Math.random() - 0.5);
      console.log("sortedArray", sortedArraytoo);
      const RoundQualy = sortedArraytoo.push(
        i,
        Math.floor(Math.random) * (roundQualy.length - (i + 1))
      );
      console.log("RoundQualy", RoundQualy);
      return console.log(RoundQualy);
    }
  }
}
