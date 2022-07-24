export default function validate(input) {
  const error = {};

  if(input.title.length > 50) {
    error.title = 'The title cannot be longer than 50 characters';
  }

  return error;
}