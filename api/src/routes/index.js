const { Router } = require('express');
const RouteUser = require("../routes/UserRouter");
const category = require("../routes/CategoryRouter.js");
const Sponsor = require("../routes/SponsorRouter.js");
const Score = require("../routes/ScoreRouter.js");
const Subtournament = require("../routes/SubtRouter.js");
const Tournament = require("../routes/TournamentRouter.js");
const inscription = require("../routes/InscriptionRouter.js");
const Team = require("../routes/TeamRouter.js");
const Auth = require("../routes/AuthRouter.js");
const Gallery = require("../routes/GalleryRouter.js");
const router = Router();
////////////////ImagesFromDataBase///////////
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { Image } = require('../db.js');
////////////////ImagesFromDataBase///////////


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

////////////////ImagesFromDataBase///////////


// const diskStorege = multer.diskStorage({
//   destination: path.join(__dirname, '../images'),
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-fernando-' + file.originalname)
//   }
// })



// const fileUpload = multer({
//   storage: diskStorege
// }).single('image')




// router.post('/images/post', fileUpload, async (req, res) => {
//   // console.log(req.file);
  
//   const type = req.file.mimetype;
//   const name = req.file.originalname;
//   const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))

//   const imageFromDb = await Image.create({
//     type,
//     name,
//     data
//   })

//   imageFromDb ? res.send('image created') : res.send('error');

//   const images = fs.readdirSync(path.join(__dirname, '../images/'))
//   images.map((img) => {
//     fs.unlinkSync(path.join(__dirname, `../images/${img}`));
//   })
  
// })

// router.get('/images/get',  async (req, res) => {
//   const imagenes = await Image.findAll();

//   imagenes.map(image => {
//     fs.writeFileSync(path.join(__dirname, `../dataBaseImages/${image.id}-${image.name}`),image.data)
//   })

//   const imagesdir = fs.readdirSync(path.join(__dirname, '../dataBaseImages/'))

//   res.json(imagesdir)

// })

// router.delete('/images/delete/:image', async (req, res) => {
//   const { image } = req.params;
//   const image_id = image.split('-')[0]
  
//   fs.unlinkSync(path.join(__dirname, `../dataBaseImages/${image}`));
  
//   const imageDeleted = await Image.destroy({ where: { id: parseInt(image_id) } })
//   imageDeleted === 1 ? res.status(200).send({msg: 'Image deleted successfully'}) : res.status(400).send({msg: 'Image does not exist'})
// })

// router.get('/images/prueba/delete', (req, res) => {
//   const dbImages = fs.readdirSync(path.join(__dirname, '../dataBaseImages/'))

//   dbImages && dbImages.map((img) => {
//     fs.unlinkSync(path.join(__dirname, `../dataBaseImages/${img}`));
//   })

//   res.send('file cleared');

// })


////////////////ImagesFromDataBase///////////




router.use("/category", category);
router.use("/user", RouteUser);
router.use("/sponsor", Sponsor);
router.use("/score", Score);
router.use("/subtournament", Subtournament);
router.use("/inscription", inscription);
router.use('/tournament', Tournament);
router.use('/team', Team);
router.use('/auth', Auth);
router.use('/gallery', Gallery);


module.exports = router;
