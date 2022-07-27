require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
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
const { User, Team, Match, Round, Inscription, Tournament, Subtournament, Score, Category, Sponsor, Image } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Score.hasOne(User, {foreignKey: 'id_score'});
User.belongsTo(Score, {foreignKey: 'id_score'});

Category.hasMany(User, {foreignKey: 'id_category'});
User.belongsTo(Category, {foreignKey: 'id_category'});

User.hasMany(Inscription, {foreignKey: 'id_user'});
Inscription.belongsTo(User, {foreignKey: 'id_user'});

Subtournament.hasMany(Inscription, {foreignKey: 'id_subt'});
Inscription.belongsTo(Subtournament, {foreignKey: 'id_subt'});

Team.belongsToMany(User, {through: 'team_user', foreignKey: 'id_team'}); 
User.belongsToMany(Team, {through: 'team_user', foreignKey: 'id_user'});

Tournament.belongsToMany(Sponsor, {through: 'sponsor_tournament', foreignKey: 'id_tournament'});
Sponsor.belongsToMany(Tournament, {through: 'sponsor_tournament', foreignKey: 'id_sponsor'});

Tournament.hasMany(Inscription, {foreignKey: 'id_tournament'});
Inscription.belongsTo(Tournament, {foreignKey: 'id_tournament'});

Tournament.hasMany(Subtournament, {foreignKey: 'id_tournament'});
Subtournament.belongsTo(Tournament, {foreignKey: 'id_tournament'});

Category.hasMany(Subtournament, {foreignKey: 'id_category'});
Subtournament.belongsTo(Category, {foreignKey: 'id_category'});

Subtournament.hasMany(Round, {foreignKey: 'id_subt'});
Round.belongsTo(Subtournament, {foreignKey: 'id_subt'});

Round.hasMany(Match, {foreignKey: 'id_round'});
Match.belongsTo(Round, {foreignKey: 'id_round'});

Team.belongsToMany(Match, {through: 'match_team', foreignKey: 'id_team'});
Match.belongsToMany(Team, {through: 'match_team', foreignKey: 'id_match'});

Subtournament.hasMany(Team, {foreignKey: 'id_subt'});
Team.belongsTo(Subtournament, {foreignKey: 'id_subt'});

Image.hasMany(User, {foreignKey: 'id_image'});
User.belongsTo(Image, {foreignKey: 'id_image'});



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,    // para importart la conexión { conn } = require('./db.js');
  Op
};
