require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
                                                                                //cambiar nombre de la DB
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully to db.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Team, Match, Round, Inscription, Tournament, Subtournament, Score, Category, Sponsor } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Score.hasOne(User, {foreignKey: 'id_score'});
User.belongsTo(Score, {foreignKey: 'id_score'});

Category.hasMany(User, {foreignKey: 'id_category'});
User.belongsTo(Category, {foreignKey: 'id_category'});
////////////////////////////
User.hasMany(Inscription, {foreignKey: 'id_user'});
Inscription.belongsTo(User, {foreignKey: 'id_user'});

Team.hasMany(User, {foreignKey: 'id_team'});
User.belongsTo(Team, {foreignKey: 'id_team'});

Tournament.belongsToMany(Sponsor, {through: 'sponsor_tournament'});
Sponsor.belongsToMany(Tournament, {through: 'sponsor_tournament'});

Tournament.hasMany(Inscription, {foreignKey: 'id_tournament'});
Inscription.belongsTo(Tournament, {foreignKey: 'id_tournament'});

Tournament.hasMany(Subtournament, {foreignKey: 'id_tournament'});
Subtournament.belongsTo(Tournament, {foreignKey: 'id_tournament'});

Category.hasMany(Subtournament, {foreignKey: 'id_category'});
Subtournament.belongsTo(Category, {foreignKey: 'id_category'});

Subtournament.hasMany(Round, {foreignKey: 'id_subt'});
Round.belongsTo(Subtournament, {foreignKey: 'id_subt'});

Match.hasMany(Round, {foreignKey: 'id_match'});
Round.belongsTo(Match, {foreignKey: 'id_match'});

Match.hasMany(Team, {foreignKey: 'id_match'});
Team.belongsTo(Match, {foreignKey: 'id_match'});




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
