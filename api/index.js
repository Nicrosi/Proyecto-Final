const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");


axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

// Syncing all the models at once.

conn.sync({ force: true }).then(async () => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
  ////////recarga de un admin
  let admin = {
    dni: "0",
    name: "Admin",
    last_name: "OE",
    is_admin: true,
    e_mail: "admin@gmail.com",
    password: process.env.PASSWORD_ADM, //env
    phone: "0",
    num_contact: "0",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "NoGender",
  };
  
  try {
    await axios.post(`https://proyecto-final-production-2fb1.up.railway.app/category/`, { type: "A" });
    await axios.post(`https://proyecto-final-production-2fb1.up.railway.app/category/`, { type: "B" });
    await axios.post(`https://proyecto-final-production-2fb1.up.railway.app/category/`, { type: "C" });
    await axios.post(`https://proyecto-final-production-2fb1.up.railway.app/category/`, { type: "E" });
    await axios.post(`https://proyecto-final-production-2fb1.up.railway.app/category/, {
      organizer_earnings: 30,
      tennis_courts: 50,
      awards: 20,
    });
    await axios.post(`https://proyectofinal25b.herokuapp.com/auth/register`, admin);
  } catch (error) {
    console.log("Admin Already Exist");
  }
});
