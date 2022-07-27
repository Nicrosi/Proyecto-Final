export default function validate(input) {
  let error = {};

  if (!input.company) {
    error.company = "Name is required";
  } else if (input.company.length > 255) {
    error.company = "Enter less than 255 characters";
  }

  if (!input.message) {
    error.message = "Message is required";
  } else if (input.message.length > 255) {
    error.message = "Enter less than 255 characters";
  }

  if (!input.logo) {
    error.logo = "Logo is required";
  } else if (!/.(gif|jpeg|jpg|png)$/i.test(input.logo) && input.logo) {
    error.logo = "Enter a correct image format (gif,jpeg,jpg,png)";
  }

  if (!input.link) {
    error.link = "Link is required";
  } else if (input.link.length > 255) {
    error.link = "Enter less than 255 characters";
  }

  return error;
}