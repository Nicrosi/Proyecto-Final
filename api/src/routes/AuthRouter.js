const { Router } = require("express");
const router = Router();
const { User, Inscription, Score, Category } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middlewares/authjwt");
const passport = require("passport");

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
      gender,
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
      include: [Inscription, Score, Category],
    });

    console.log(user);
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
    include: [Inscription, Score, Category],
  });
  res.status(200).json({ ...user?.dataValues, password: "Hackeame perro" });
});

router.get(
  "/login/google",
  [
    passport.authenticate("sign-up-google", {
      scope: ["profile", "email"],
      session: false,
    }),
  ],
  (req, res, next) => {
    res.status(404).send("esfsese");
    /* if (req.user) {
      const token = jwt.sign(
        { user_email: req.user.e_mail },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        token,
        user: { ...req.user.dataValues, password: "Hackeame perro" },
      });
    } else {
      res.status(404).send("Error,please try again!");
    } */
  }
);
router.get(
  "/google/callback",
  passport.authenticate("sign-up-google", {
    successRedirect: "http://localhost:3000/profile/1",
    failureRedirect: "http://localhost:3000/login/failed",
    session: false,
  })
);
router.get("/login/failed", (req, res) => {
  res.status(401).json({ success: false, message: "failure" });
});

module.exports = router;
