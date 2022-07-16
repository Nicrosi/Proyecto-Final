const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require ("axios");

// Syncing all the models at once.

conn.sync({ force: false }).then(async() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
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
    picture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    gender: "NoGender",
}
try {
await axios.post(`http://localhost:3001/auth/register`, admin);
} catch (error) {
console.log("Admin Already Exist");
}
});
