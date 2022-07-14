const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

router.post("/register", async (req, res, next) => {
    try {
        const {e_mail, password} = req.body;
    
    const user = await User.findOne({where: {
        e_mail: e_mail,
      }})
    
    if(user){
        return res.status(409).json({ error:"User/Email Already Exist"});
    }

    const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
    )

    await User.create({
        e_mail,
        password:hashedPassword,
    })

    return res.status(201).json({ok: "User created!"})
      
    } catch (error) {
        return res.status(403).json({error: "Username or Password invalid"})
    }
  });
  

router.post("/login", async (req,res, next)=>{
    try {
        const {e_mail, password}=req.body;

        if(!e_mail || !password){
            return res.status(400).json({error: "Email and Password are required"});            
        }

        const user = await User.findOne({where:{e_mail:e_mail}})

        if(!user){
            return res.status(403).json({error: "Username or Password invalid"})
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(403).json({error: "Username or Password invalid"})    
        }

        const token = jwt.sign({user_email: user.e_mail}, process.env.JWT_SECRET)

        return res.status(200).json({token:token})
    } catch (error) {
        console.log(error)
        return res.status(404).send("Error,please try again!")
    }
})
  module.exports = router;
  