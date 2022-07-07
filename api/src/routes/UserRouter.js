const {Router} = require('express');
const router = Router();
const {get_Userdb} = require('../utils/User_Controllers');
const {User} = require('../db');


router.get('/', async (req,res) => {
    let {name}= req.query
    const allUsers = await get_Userdb()
    
    if(name){
        user_name = await allUsers.filter( e => e.name.includes(name))
        user_name.length > 0 ? res.status(200).send(user_name) : res.status(404).send("User not found!")
    }else{
        res.status(200).send({allUsers})
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

module.exports = router;