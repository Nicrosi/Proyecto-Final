const { Router } = require('express');
<<<<<<< HEAD
const { Sequelize, Op } = require('sequelize');
const { User, Inscription, Score, Category } = require('../db.js');
// const users = require('../../players.json')
=======
const RouteUser = require('../routes/UserRouter')
>>>>>>> 2d275bf4837595a2f92d43ccefaa83af40ff601b
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const Users = [
  {
    dni: 0,
    name: "Axel",
    last_name: "Castillo",
    isAdmin: true,
    e_mail: "aCastillo@gmail.com",
    phone: 84216484,
    num_contact: 0,
    picture: "https://i.stack.imgur.com/dr5qp.jpg",
    gender: "male",
    id_Inscription: {
      amount: 0,
      isPayed: false,
      tournament: 0
    },
    score: {
      id_Score:0,
      previous_tournaments: 0,
      hit_knowledge: 0,
      other_strokes: 0,
      special_hits: 0,
      kick_serve_control: 0,
      game_strategy: 0
    },
    category: {
      id_Category: 0,
      type: "a"
    }
  },
  {
    dni: 1,
    name: "Sebastian",
    last_name: "Conte",
    isAdmin: false,
    e_mail: "sebaconte@gmail.com",
    phone: 3648564,
    num_contact: 5186318,
    picture: "https://i.stack.imgur.com/dr5qp.jpg",
    gender: "male",
    id_Inscription: {
      amount: 100,
      isPayed: true,
      tournament: 2
    },
    score: {
      id_Score:1,
      previous_tournaments: 3,
      hit_knowledge: 2,
      other_strokes: 5,
      special_hits: 4,
      kick_serve_control: 4,
      game_strategy: 3
    },
    category: {
      id_Category: 1,
      type: "c"
    }
  },
  {
    dni: 0,
    name: "Denise",
    last_name: "Cardozo",
    isAdmin: true,
    e_mail: "aCastillo@gmail.com",
    phone: 84216484,
    num_contact: 0,
    picture: "https://i.stack.imgur.com/dr5qp.jpg",
    gender: "male",
    id_Inscription: {
      amount: 0,
      isPayed: false,
      tournament: 0
    },
    score: {
      id_Score:0,
      previous_tournaments: 0,
      hit_knowledge: 0,
      other_strokes: 0,
      special_hits: 0,
      kick_serve_control: 0,
      game_strategy: 0
    },
    category: {
      id_Category: 0,
      type: "a"
    }
  },
  {
    dni: 1,
    name: "Sebastian",
    last_name: "Conte",
    isAdmin: false,
    e_mail: "sebaconte@gmail.com",
    phone: 3648564,
    num_contact: 5186318,
    picture: "https://i.stack.imgur.com/dr5qp.jpg",
    gender: "male",
    id_Inscription: {
      amount: 100,
      isPayed: true,
      tournament: 2
    },
    score: {
      id_Score:1,
      previous_tournaments: 3,
      hit_knowledge: 2,
      other_strokes: 5,
      special_hits: 4,
      kick_serve_control: 4,
      game_strategy: 3
    },
    category: {
      id_Category: 1,
      type: "c"
    }
  }
]


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/user', RouteUser)

router.get('/users', async (req, res) => {

  for (let i = 0; i < Users.length; i++) {
    const user = await User.create({
      name: Users[i].name,
      last_name: Users[i].last_name,
      isAdmin: Users[i].isAdmin,
      e_mail: Users[i].e_mail,
      phone: Users[i].phone,
      num_contact: Users[i].num_contact,
      picture: Users[i].picture,
      gender: Users[i].gender,
    })
    
    const score = await Score.create({
      previous_tournaments: Users[i].score.previous_tournaments,
      hit_knowledge: Users[i].score.hit_knowledge,
      other_strokes: Users[i].score.other_strokes,
      special_hits: Users[i].score.special_hits,
      kick_serve_control: Users[i].score.kick_serve_control,
      game_strategy: Users[i].score.game_strategy
    })

    const [category] = await Category.findOrCreate({
      where : {
        type: Users[i].category.type
      },
      default: {
        type: Users[i].category.type
      }
    })
    
    await category.addUser(user)
    await score.addUser(user)
  }

  const usersCreated = await User.findAll({include: Category });

  usersCreated.length ? res.json(usersCreated) : res.status(400).send({msg: 'error'})
  
})

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  const user = await User.findByPk(parseInt(id))

  const [categoryFromDb] = await Category.findOrCreate({
    where : {
      type: category
    },
    default: {
      type: category
    }
  })
  
  await categoryFromDb.addUser(user)

  // const userCreated = await User.findOne( {where: {dni: parseInt(id)}, include: Category});
  const userCreated = await User.findOne({
    where: {
      dni: parseInt(id)
    },
    include: {
      Category,
    }
  })

  res.json(userCreated)

})




module.exports = router;
