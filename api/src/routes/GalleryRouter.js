const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Image } = require('../db.js');
const { Router } = require("express");
const router = Router();


const diskStorege = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-fernando-' + file.originalname)
  }
})



const fileUpload = multer({
  storage: diskStorege
}).single('image')


router.post('/post', fileUpload, async (req, res) => {
  try {
    
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
  } catch (error) {
    res.status(400).send(error)
  }
  
})



router.get('/get',  async (req, res) => {
  try {
    
    const imagenes = await Image.findAll();
  
    imagenes.map(image => {
      fs.writeFileSync(path.join(__dirname, `../dataBaseImages/${image.id}-${image.name}`),image.data)
    })
  
    const imagesdir = fs.readdirSync(path.join(__dirname, '../dataBaseImages/'))
  
    res.json(imagesdir)
  } catch (error) {
    res.status(400).send(error)
  }

})



router.delete('/delete/:image', async (req, res) => {
  try {
    
    const { image } = req.params;
    const image_id = image.split('-')[0]
    
    fs.unlinkSync(path.join(__dirname, `../dataBaseImages/${image}`));
    
    const imageDeleted = await Image.destroy({ where: { id: parseInt(image_id) } })
    imageDeleted === 1 ? res.status(200).send({msg: 'Image deleted successfully'}) : res.status(400).send({msg: 'Image does not exist'})
  } catch (error) {
    res.status(400).send(error)
  }
})



router.delete('/delete', (req, res) => {
  try {
    
    const dbImages = fs.readdirSync(path.join(__dirname, '../dataBaseImages/'))
  
    dbImages && dbImages.map((img) => {
      fs.unlinkSync(path.join(__dirname, `../dataBaseImages/${img}`));
    })
  
    res.send('file cleared');
  } catch (error) {
    res.status(400).send(error)
  }

})

module.exports = router;