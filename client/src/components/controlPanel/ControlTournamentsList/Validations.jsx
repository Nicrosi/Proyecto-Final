export default function validate(input) {
  let error = {};
  // if (!input.date) {
  //   error.company = "Name is required";
  // } else if (
  //   !/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(input.date) &&
  //   input.date
  // ) {
  //   error.date = "Invalid date format";
  // }

  if (!input.location) {
    error.location = "Location is required";
  } else if (input.location.length > 255) {
    error.location = "Enter less than 255 characters";
  }
  if (!input.name) {
    error.name = "Name is required";
  } else if (input.name.length > 255) {
    error.name = "Enter less than 255 characters";
  }

  return error;
}