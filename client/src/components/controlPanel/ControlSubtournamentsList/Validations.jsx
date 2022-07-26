export default function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name is required";
  } else if (input.name.length > 255) {
    error.name = "Enter less than 255 characters";
  }

  if (!input.numb_players) {
    error.numb_players = "Numb players is required";
  } else if (Number(input.numb_players) % 2 === 1) {
    error.numb_players = "only pairs";
  } else if (input.numb_players > 16 || input.numb_players < 4) {
    error.numb_players = "Enter less than 16 players and more than 4";
  }
  if (!input.price) {
    error.price = "Price is required";
  }

  if (input.gender.length === 0 && input.gender === "") {
    error.gender = "Gender is required";
  }

  if (input.match_type.length === 0 && input.match_type === "") {
    error.match_type = "Match type is required";
  }

  if (input.elimination_type.length === 0 && input.elimination_type === "") {
    error.elimination_type = "Elimination type is required";
  }

  if (input.id_category.length === 0 && input.id_category === "") {
    error.id_category = "Category type is required";
  }
  return error;
}