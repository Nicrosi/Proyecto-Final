
const { Router } = require("express");
const RouteUser = require("../routes/UserRouter");
const category = require("../routes/CategoryRouter.js");
const Sponsor = require("../routes/SponsorRouter.js");
const Score = require("../routes/ScoreRouter.js");
const Subtournament = require("../routes/SubtRouter.js");
const Tournament = require("../routes/TournamentRouter.js");
const inscription = require("../routes/InscriptionRouter.js");
const Team = require("../routes/TeamRouter.js");
const auth = require("../routes/AuthRouter");
const router = Router();

////////////////ImagesFromDataBase///////////
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Image } = require("../db");

////////////////ImagesFromDataBase///////////


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers


////////////////ImagesFromDataBase///////////

const diskStorege = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-fernando-' + file.originalname)
  }
})



const fileUpload = multer({
  storage: diskStorege
}).single('image')



router.post('/images/prueba', fileUpload, async (req, res) => {
  // console.log(req.file);
  
  const type = req.file.mimetype;
  const name = req.file.originalname;
  const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))

  const imageFromDb = await Image.create({
    type,
    name,
    data
  })

  imageFromDb ? res.send('image created') : res.send('error');

  const images = fs.readdirSync(path.join(__dirname, '../images/'))
  images.map((img) => {
    fs.unlinkSync(path.join(__dirname, `../images/${img}`));
  })
  
})


router.get('/images/prueba',  async (req, res) => {
  const imagenes = await Image.findAll();

  // const dbImages = fs.readdirSync(path.join(__dirname, '../dbImages/'))
  // const images = fs.readdirSync(path.join(__dirname, '../images/'))

  imagenes.map(image => {
    fs.writeFileSync(path.join(__dirname, `../dataBaseImages/${image.id}-${image.name}.jpg`),image.data)
  })

  const imagesdir = fs.readdirSync(path.join(__dirname, '../dataBaseImages/'))

  res.json(imagesdir)

})


router.get('/images/prueba/delete', (req, res) => {
  const dbImages = fs.readdirSync(path.join(__dirname, '../dataBaseImages/'))

  dbImages && dbImages.map((img) => {
    fs.unlinkSync(path.join(__dirname, `../dataBaseImages/${img}`));
  })

  res.send('file cleared');

})

////////////////ImagesFromDataBase///////////



router.use('/auth', auth);
router.use("/category", category);
router.use("/user", RouteUser);
router.use("/sponsor", Sponsor);
router.use("/score", Score);
router.use("/subtournament", Subtournament);
router.use("/inscription", inscription);
router.use('/tournament', Tournament);
router.use('/team', Team);


module.exports = router;
