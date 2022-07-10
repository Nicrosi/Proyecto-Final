const {Router} = require('express');
const router = Router();
const {get_Userdb} = require('../utils/User_Controllers');
const { User, Category, Inscription, Score, Op } = require('../db');
const  ArrayUsers  = require('../ArrayUserEjemplo.js')

// console.log(ArrayUsers);


router.get('/', async (req,res) => {
    let {name}= req.query
    const allUsers = await get_Userdb()
    
    if(name){
        user_name = await get_Userdb(name)
        user_name.length > 0 ? res.status(200).send(user_name) : res.status(404).send("User not found!")
    }else{
        allUsers.length > 0? res.status(200).send(allUsers) : res.status(404).send("Users doesn't exist!")
    }
}) 


router.get('/prueba', async (req, res) => {

  const users = await User.findAll(
    {
      include: [
        Inscription,
        Score,
        Category
      ]
    }
  );

  if(!users.length) {
    // ArrayUsers.map((user) => {
    for (let i = 0; i < ArrayUsers.length; i++) {
      
      const scoredb = await Score.create(
        {
          previous_tournaments: ArrayUsers[i].score.previous_tournaments,
          hit_knowledge: ArrayUsers[i].score.hit_knowledge,
          other_strokes: ArrayUsers[i].score.other_strokes,
          special_hits: ArrayUsers[i].score.special_hits,
          kick_serve_control: ArrayUsers[i].score.kick_serve_control,
          game_strategy: ArrayUsers[i].score.game_strategy
        }
      )

      
      const categorydb = await Category.create(
        {
          type: ArrayUsers[i].category.type
        }
      )

      const user = await User.create(
        {
          dni: ArrayUsers[i].dni,
          name: ArrayUsers[i].name,
          last_name: ArrayUsers[i].last_name,
          is_admin: ArrayUsers[i].is_admin,
          e_mail: ArrayUsers[i].e_mail,
          phone: ArrayUsers[i].phone,
          num_contact: ArrayUsers[i].num_contact,
          picture: ArrayUsers[i].picture,
          gender: ArrayUsers[i].gender,
          id_score: scoredb.id_score,
          id_category: categorydb.id_category
        }
      )

      await Inscription.create(
        {
          amount: ArrayUsers[i].inscription.amount,
          is_payed: ArrayUsers[i].inscription.isPayed,
          tournament: ArrayUsers[i].inscription.tournament,
          id_user: user.id_user
        }
      )


    }

    const UsersFromDB = await User.findAll(
      {
        include: [
          Inscription,
          Score,
          Category
        ]
      }
    )

    return res.status(200).json(UsersFromDB)
    
  }
  
  return res.status(200).json(users)
  

})


router.get('/:dni', async (req,res) => {
  const { dni } = req.params;

  const UsersFoundById = await User.findOne(
    {
      where: {
        dni: parseInt(dni)
      },
      include: [
        Inscription,
        Score,
        Category
      ]
    }
  )

  if(UsersFoundById) {
    res.status(200).json(UsersFoundById);
  }else{
    res.status(400).json({msg_error: 'User not found'});
  }
})


router.post('/', async (req, res) => {
    let{
        dni,
        name,
        last_name,
        is_admin,
        e_mail,
        phone,
        num_contact,
        picture,
        gender
    } = req.body;

    try{
        let findUser = await User.findAll({
            where:{
                dni: dni
            }
        })
        if(findUser.length > 0){
            res.status(403).send("User could not be created, DNI already in use");
        }else{
            await User.create({
                dni,
                name,
                last_name,
                is_admin,
                e_mail,
                phone,
                num_contact,
                picture,
                gender
            });
            res.send('Created!');
        }
    }catch(err){
        console.log(err)
    }
})


router.put('/:dni', async (req, res) => {
    const { dni } = req.params;
    const { category, e_mail } = req.body; 

    try {
  
      const find_user_by_pk = await User.findByPk(parseInt(dni))

      const AllUsers = await User.findAll();
      let comparison = false;

      AllUsers.length && AllUsers.map((user) => {
        if( e_mail && e_mail === user.e_mail) {
          comparison = true;
        }
        console.log(user.e_mail);
      })
  
      if(find_user_by_pk) {
  
        if( category && category.type === "A" || category && category.type === "B" || category && category.type === "C" || category && category.type === "E" ) {
          
          
          const userCategory = await User.findByPk(parseInt(dni));
        
          const [categoryFromDb] = await Category.findOrCreate({
            where : {
              type: category.type
            },
          })
          
          await categoryFromDb.addUser(userCategory)
        }
        else if (category && category.type !== "A" || category && category.type !== "B" || category && category.type !== "C" || category && category.type !== "E" ){
          return res.send({msg_error: 'Invalid category'})
        }
      
        if(!comparison) {

          await User.update(
            req.body,{
            where :{
              dni: parseInt(dni)
            }
          })
          res.send({msg_mesage: 'User updated'})
        }else{
          res.status(400).send({msg_mesage: 'User email already exist'})
        }
  
  
      }else{
        res.send({msg_mesage: 'User not found'})
      }
  
    } catch (error) {
      console.log(error);
    }
  
  })
module.exports = router;