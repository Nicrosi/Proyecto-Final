const { Router } = require("express");
const router = Router();
const { User, Inscription, Tournament, Subtournament, Score, Category,Team } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middlewares/authjwt");
const passport = require("passport");
const Users = require('../ArrayUserEjemplo.js');
const { category } = require("../utils/Category_Controllers.js");



router.post("/register", async (req, res, next) => {
  try {
    let {
      dni,
      name,
      last_name,
      is_admin,
      e_mail,
      password,
      phone,
      num_contact,
      picture,
      gender
    } = req.body;

    const user = await User.findOne({
      where: {
        e_mail: e_mail,
      },
    });

    if (user) {
      return res.status(409).json({ error: "User/Email Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    await User.create({
      dni,
      name,
      last_name,
      is_admin,
      e_mail,
      password: hashedPassword,
      phone,
      num_contact,
      picture,
      gender,
    });

    return res.status(201).json({ ok: "User created!" });
  } catch (error) {
    return res.status(403).json({ error: "Username or Password invalid" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { e_mail, password } = req.body;

    if (!e_mail || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const user = await User.findOne({
      where: { e_mail: e_mail },
      include: [
        Inscription, 
        Score, 
        Category
      ],
    });

    if (!user) {
      return res.status(403).json({ error: "Username or Password invalid" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(403).json({ error: "Username or Password invalid" });
    }

    const token = jwt.sign({ user_email: user.e_mail }, process.env.JWT_SECRET);

    return res.status(200).json({
      token: token,
      user: { ...user.dataValues, password: "Hackeame perro" },
    });
  } catch (error) {
    return res.status(404).send("Error,please try again!");
  }
});

router.get("/verifytoken", [verifyToken], async (req, res) => {
  const user = await User.findOne({
    where: { e_mail: req.e_mail },
    include: [
      Inscription, 
      Score, 
      Category
    ],
  });
  res.status(200).json({ ...user?.dataValues, password: "Hackeame perro" });
});

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/login/google/success", function (req, res) {
  if (req.user) {
    const token = jwt.sign(
      { user_email: req.user.e_mail },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token,
      user: { ...req.user, password: "Hackeame perro" },
    });
  } else {
    res.status(404).send("Error,please try again!");
  }
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/SignIn",
    successRedirect: "http://localhost:3000/login",
  })
);
router.get("/login/google/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("http://localhost:3000/login");
  });
});

////////////////////////


router.post('/test', async (req, res) => {
  try {
    const tournament = await Tournament.create({
      name: "Tournament Prueba",
      date: "2022-08-23",
      location: "Argentino",
      earnings: 0
    })

    for (let i = 0; i < Users.subTournament.length; i++) {
      await Subtournament.create({
        elimination_type: Users.subTournament[i].elimination_type,
        match_type: Users.subTournament[i].match_type,
        name: Users.subTournament[i].name,
        numb_players: Users.subTournament[i].numb_players,
        gender: Users.subTournament[i].gender,
        price: Users.subTournament[i].price,
        id_category: Users.subTournament[i].id_category,
        id_tournament: tournament.id_tournament
      })      
    }

    
    for (let i = 0; i < Users.score.length; i++) {
      await Score.create({
        previous_tournaments: Users.score[i].previous_tournaments,
        hit_knowledge: Users.score[i].hit_knowledge,
        other_strokes: Users.score[i].other_strokes,
        special_hits: Users.score[i].special_hits,
        kick_serve_control: Users.score[i].kick_serve_control,
        game_strategy: Users.score[i].game_strategy
      })
    }

    let array1 = Users.users.slice(0, 4);
    let array2 = Users.users.slice(4, 20);
    let array3 = Users.users.slice(20, 36);
    let array4 = Users.users.slice(36, 40);
    let array5 = Users.users.slice(40, 50);

    const score = await Score.findAll();
    let  subtA = Users.subTournament[0]
    for (let i = 0; i < array1.length; i++) {
      const hashedPassword = await bcrypt.hash(array1[i].password, Number(process.env.SALT_ROUNDS));
      const currentUser =  await User.create({
        dni: array1[i].dni,
        name: array1[i].name,
        last_name: array1[i].last_name,
        is_admin: array1[i].is_admin,
        e_mail: array1[i].e_mail,
        password: hashedPassword,
        phone: array1[i].phone,
        num_contact: array1[i].num_contact,
        picture: array1[i].picture,
        gender: array1[i].gender,
        id_score: score[0].id_score,
        id_category: 1
      });

        const newTeam = await Team.create({
          points: 0,
          id_subt: 1
        })
        
        const teamUser = await User.findByPk(currentUser.id_user)
        await teamUser.addTeam(newTeam)
        await Inscription.create({
          description: "test description",
          amount: subtA.price,
          is_payed : true,
          id_user: currentUser.id_user,
          id_tournament: 1,
          id_subt: 1
        });
      
    }


    let  subtB = Users.subTournament[1]
    for (let i = 0; i < array2.length; i++) {
      const hashedPassword = await bcrypt.hash(array2[i].password, Number(process.env.SALT_ROUNDS));
      const currentUser = await User.create({
        dni: array2[i].dni,
        name: array2[i].name,
        last_name: array2[i].last_name,
        is_admin: array2[i].is_admin,
        e_mail: array2[i].e_mail,
        password: hashedPassword,
        phone: array2[i].phone,
        num_contact: array2[i].num_contact,
        picture: array2[i].picture,
        gender: array2[i].gender,
        id_score: score[1].id_score,
        id_category: 2
      });

      
      const newTeam = await Team.create({
        points: 0,
        id_subt: 2
      })
      const teamUser = await User.findByPk(currentUser.id_user)
      await teamUser.addTeam(newTeam)
      await Inscription.create({
        description: "test description",
        amount: subtB.price,
        is_payed : true,
        id_user: currentUser.id_user,
        id_tournament: 1,
        id_subt: 2
      });
    }

    let  subtC = Users.subTournament[2]
    for (let i = 0; i < array3.length; i++) {
      const hashedPassword = await bcrypt.hash(array3[i].password, Number(process.env.SALT_ROUNDS));
      const currentUser =  await User.create({
        dni: array3[i].dni,
        name: array3[i].name,
        last_name: array3[i].last_name,
        is_admin: array3[i].is_admin,
        e_mail: array3[i].e_mail,
        password: hashedPassword,
        phone: array3[i].phone,
        num_contact: array3[i].num_contact,
        picture: array3[i].picture,
        gender: array3[i].gender,
        id_score: score[2].id_score,
        id_category: 3
      });

      const newTeam = await Team.create({
        points: 0,
        id_subt: 3
      })
      const teamUser = await User.findByPk(currentUser.id_user)
      await teamUser.addTeam(newTeam)
      await Inscription.create({
        description: "test description",
        amount: subtC.price,
        is_payed : true,
        id_user: currentUser.id_user,
        id_tournament: 1,
        id_subt: 3
      });
    }
    let  subtE = Users.subTournament[3]
    for (let i = 0; i < array4.length; i++) {
      const hashedPassword = await bcrypt.hash(array4[i].password, Number(process.env.SALT_ROUNDS));
      const currentUser = await User.create({
        dni: array4[i].dni,
        name: array4[i].name,
        last_name: array4[i].last_name,
        is_admin: array4[i].is_admin,
        e_mail: array4[i].e_mail,
        password: hashedPassword,
        phone: array4[i].phone,
        num_contact: array4[i].num_contact,
        picture: array4[i].picture,
        gender: array4[i].gender,
        id_score: score[3].id_score,
        id_category: 4
      });
      const newTeam = await Team.create({
        points: 0,
        id_subt: 4
      })
      const teamUser = await User.findByPk(currentUser.id_user)
      await teamUser.addTeam(newTeam)
      await Inscription.create({
        description: "test description",
        amount: subtE.price,
        is_payed : true,
        id_user: currentUser.id_user,
        id_tournament: 1,
        id_subt: 4
      });
    }

    for (let i = 0; i < array5.length; i++) {
      const hashedPassword = await bcrypt.hash(array5[i].password, Number(process.env.SALT_ROUNDS));
      await User.create({
        dni: array5[i].dni,
        name: array5[i].name,
        last_name: array5[i].last_name,
        is_admin: array5[i].is_admin,
        e_mail: array5[i].e_mail,
        password: hashedPassword,
        phone: array5[i].phone,
        num_contact: array5[i].num_contact,
        picture: array5[i].picture,
        gender: array5[i].gender,
      });
    }



    const users = await User.findAll({include: [Score, Category]});

    res.json(users)
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
