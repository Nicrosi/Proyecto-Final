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
        let user_name = await get_Userdb(name)
        user_name.length > 0 ? res.status(200).send(user_name) : res.status(404).send("User not found!")
    }else{
        allUsers.length > 0? res.status(200).send(allUsers) : res.status(404).send("Users doesn't exist!")
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


router.put('/:dni', async (req, res) => {
    const { dni } = req.params;
    const { name, last_name, is_admin, e_mail, phone, num_contact, picture, gender, category } = req.body; 
///////////////////////////////////////////////////////////
    try {
  
      const find_user_by_pk = await User.findOne({where: { dni: parseInt(dni) }});

      const AllUsers = await User.findAll();
      let comparison = false;

      // if(find_user_by_pk.e_mail !== e_mail) {

      //   AllUsers.length && AllUsers.map((user) => {
      //     if( e_mail && e_mail === user.e_mail ) {
      //       comparison = true;
      //     }
      //   })
        
      // }
  
      if(find_user_by_pk) {
  
        if(!comparison) {

          let CategoryToUpdate = find_user_by_pk.id_category;

          if( category && category === "A" || category && category === "B" || category && category === "C" || category && category === "E" ) {
          
            const categoryFromDb = category && await Category.findOne({
              where: {
                type: category
              }
            })

            CategoryToUpdate = categoryFromDb.id_category;
            
          }

          console.log(CategoryToUpdate);

          await User.update(
            { 
              name: name && name, 
              last_name: last_name && last_name, 
              is_admin: is_admin && is_admin , 
              e_mail: e_mail && e_mail , 
              phone: phone && phone , 
              num_contact: num_contact && num_contact , 
              picture: picture && picture , 
              gender: gender && gender , 
              id_category: CategoryToUpdate 
            },
            {
              where :{
                dni: parseInt(dni)
              }
            }
          )
          res.send({msg_mesage: 'User updated'})
        }else{
          res.status(400).send({msg_mesage: 'User email already exist'})
        }
  
      }else{
        res.send({msg_mesage: 'User not found'})
      }
  
    } catch (error) {
      console.log("error",error);
    }
  
  })
module.exports = router;