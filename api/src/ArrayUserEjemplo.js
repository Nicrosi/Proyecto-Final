
/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require('@faker-js/faker');

const cantUser = 50
//For test
const users = [];
const Tournaments = {
  name: "Tournament Prueba",
  date: "2022-08-23",
  location: "Argentino",
  earnings: 0
}
const subTournament = [
  {
    elimination_type: "simple",
    match_type: "singles",
    name: "Prueba1",
    numb_players: 4,
    gender: "male",
    price: 100,
    id_category: 1
  },
  {
    elimination_type: "simple",
    match_type: "singles",
    name: "Prueba2",
    numb_players: 16,
    gender: "female",
    price: 200,
    id_category: 2
  },
  {
    elimination_type: "simple",
    match_type: "singles",
    name: "Prueba3",
    numb_players: 8,
    gender: "female",
    price: 300,
    id_category: 3
  },
  {
    elimination_type: "simple",
    match_type: "singles",
    name: "Prueba4",
    numb_players: 4,
    gender: "male",
    price: 150,
    id_category: 4
  },
];

const Score = [
  {
    previous_tournaments: 0,
    hit_knowledge: 5,
    other_strokes: 5,
    special_hits: 5,
    kick_serve_control: 5,
    game_strategy: 5
  },
  {
    previous_tournaments: 0,
    hit_knowledge: 4,
    other_strokes: 4,
    special_hits: 3,
    kick_serve_control: 3,
    game_strategy: 3
  },
  {
    previous_tournaments: 0,
    hit_knowledge: 3,
    other_strokes: 3,
    special_hits: 2,
    kick_serve_control: 3,
    game_strategy: 1
  },
  {
    previous_tournaments: 0,
    hit_knowledge: 1,
    other_strokes: 1,
    special_hits: 1,
    kick_serve_control: 1,
    game_strategy: 1
  },
]


for (i = 0; i <= cantUser; i++) {
  users.push({
    name: "Name" + i,
    dni: i+1, ///para que no choque con el del admin id
    last_name: "Lastname" + i,
    is_admin: false,
    e_mail: `example${i}@gmail.com`,
    password: "example" + i,
    phone: 8888 + i,
    num_contact: 8889 + i,
    picture: faker.image.image(640, 480, true),
    gender: i % 2 === 0 ? "male" : "female",
  });
}

const Users = {
  users: users,
  tournaments: Tournaments,
  subTournament: subTournament,
  score: Score
}

module.exports = Users;

