const {Router} = require('express');
const router = Router();
const {get_Userdb} = require('../utils/User_Controllers');
const { User, Category, Score } = require('../db');
//////////////////////////////

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


router.post('/', async (req, res) => {
    const {
        dni,
        name,
        last_name,
        is_admin,
        e_mail,
        phone,
        num_contact,
        picture,
        gender,
    } = req.body;

    const {
      previous_tournaments,
      hit_knowledge,
      other_strokes,
      special_hits,
      kick_serve_control,
      game_strategy
    } = req.body.score;

    const sco = await Score.create(
      {
        previous_tournaments,
        hit_knowledge,
        other_strokes,
        special_hits,
        kick_serve_control,
        game_strategy
      }
    )

    const user = await User.create(
      {
        dni,
        name,
        last_name,
        is_admin,
        e_mail,
        phone,
        num_contact,
        picture,
        gender,
        id_score: sco.id_score
      }
    )

    const userCreated = await User.findOne({
      where: {
        dni: dni
      },
      include: Score
    })

    res.json(userCreated)
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