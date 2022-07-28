export default function validate(input) {
  let error = {};

  if (!input.dni) {
    error.dni = "DNI is required";
  } else if (input.dni.length > 10) {
    error.dni = "Enter less than 10 numbers";
  } else if (!/^\d{1,10}$/.test(input.dni) && input.dni) {
    error.dni = "Enter a number";
  }

  if (!input.name) {
    error.name = "Name is required";
  } else if (input.name.length > 255) {
    error.name = "Enter less than 255 characters";
  } else if (/([0-9])/.test(input.name) ) {
    error.name = 'The Name cannot have letters'; 
  }

  if (!input.last_name) {
    error.last_name = "Last name is required";
  } else if (input.last_name.length > 255) {
    error.last_name = "Enter less than 255 characters";
  }

  if (!input.e_mail) {
    error.e_mail = "E-mail is required";
  } else if (
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(input.e_mail) &&
    input.e_mail
  ) {
    error.e_mail = "Invalid e-mail format";
  }

  if (!input.phone) {
    error.phone = "Phone is required";
  } else if (input.phone.length > 10) {
    error.phone = "Enter less than 10 numbers";
  } else if (!/^\d{1,10}$/.test(input.phone) && input.phone) {
    error.phone = "Enter a number";
  }

  if (!input.num_contact) {
    error.num_contact = "Emergency contact is required";
  } else if (input.num_contact.length > 10) {
    error.num_contact = "Enter less than 10 numbers";
  } else if (!/^\d{1,10}$/.test(input.num_contact) && input.num_contact) {
    error.num_contact = "Enter a number";
  }

  if (!input.picture) {
    error.picture = "Picture is required";
  } 

  return error;
}