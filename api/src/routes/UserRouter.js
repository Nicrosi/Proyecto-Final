const {Router} = require('express');
const router = Router();
const {get_Userdb} = require('../utils/User_Controllers');
const {User} = require('../db');


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
    const { category } = req.body; 
  
    try {
  
      const find_user_by_pk = await User.findByPk(parseInt(dni))
  
      if(find_user_by_pk) {
  
        if( category && category.type === "a" || category && category.type === "b" || category && category.type === "c" || category && category.type === "e" ) {
          
          const userCategory = await User.findByPk(parseInt(dni));
        
          const [categoryFromDb] = category && await Category.findOrCreate({
            where : {
              type: category.type
            },
            default: {
              type: category.type
            }
          })
          
          category && await categoryFromDb.addUser(userCategory)
        }
        else if (category && category.type !== "a" || category && category.type !== "b" || category && category.type !== "c" || category && category.type !== "e" ){
          return res.send({msg_error: 'Invalid category'})
        }
      
        await User.update(
          req.body,{
          where :{
            dni: parseInt(dni)
          }
        })
  
        res.send({msg_mesage: 'User updated'})
  
      }else{
        res.send({msg_mesage: 'User not found'})
      }
  
    } catch (error) {
      console.log(error);
    }
  
  })
module.exports = router;