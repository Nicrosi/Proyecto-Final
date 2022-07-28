const {Router} = require('express');
const router = Router();
const {get_Userdb} = require('../utils/User_Controllers');
const { User, Category, Inscription, Score, Image, Op } = require('../db');
const  ArrayUsers  = require('../ArrayUserEjemplo.js')

// console.log(ArrayUsers);


router.get('/' , async (req,res) => {
  try {
    
    let {name}= req.query
    const allUsers = await get_Userdb()
    
    if(name){
        let user = await get_Userdb(name)
        let user_name = {
          name: "user",
          value: user
        }
        user.length > 0 ? res.status(200).send(user_name) : res.status(400).send("User not found!")
    }
    else{
        allUsers.length > 0? res.status(200).send(allUsers) : res.status(400).send("Users doesn't exist!")
    }
  } catch (error) {
    console.log(error)
  }
}) 



router.get('/:dni', async (req,res) => {
  const { dni } = req.params;
  try{
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
  }catch(err){
    res.status(400).send(err)
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


router.put('/:id_user', async (req, res) => {
    try {
      const { dni, name, last_name, is_admin, e_mail, phone, num_contact, picture, gender } = req.body; 
      const { id_user } = req.params;

      const find_user_by_pk = await User.findOne({where: { id_user: parseInt(id_user) }});

      if(find_user_by_pk) {
  

          await User.update(
            { 
              dni: dni && dni,
              name: name && name, 
              last_name: last_name && last_name, 
              is_admin: is_admin && is_admin , 
              e_mail: e_mail && e_mail , 
              phone: phone && phone , 
              num_contact: num_contact && num_contact , 
              picture: picture && picture , 
              gender: gender && gender , 
            },
            {
              where :{
                id_user: parseInt(id_user)
              }
            }
          )
          res.send({msg_mesage: 'User updated'})
  
      }else{
        res.send({msg_mesage: 'User not found'})
      }
  
    } catch (error) {
      console.log("error",error);
    }
  
})


  router.delete('/:dni', async (req, res) => {
    const { dni } = req.params;

    try {
      const find_user_by_pk = await User.findOne({where: { dni: parseInt(dni)}});

      if (!dni || !find_user_by_pk) {
        res.send({msg_mesage: 'User not found'})
    } else {
        await User.destroy(
          {where: { dni: parseInt(dni)}}
        )
        res.json({msg_mesage: `user deleted successfully`});
    }
    } catch (error) {
      console.log("error",error);
    }
  
  })
module.exports = router;