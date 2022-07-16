import { generateRandomDraw } from "../Tournaments/Tournaments";

let Category = "";
let Gender = "";
// verificacion entre los inscriptos que user === team o que 2 user sean parte de un team

export default function TournamentsToShowAllAgainst() {
  const array = [1, 2, 3, 4];
  console.log("array", array);
  const tournaments = generateRandomDraw(array);
  console.log("tournaments", tournaments);
  return console.log(tournaments);
}
