const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Image } = require('../db.js');
const { Router } = require("express");
const cloudinary = require('cloudinary');
const router = Router();


const {
  CLOUD_NAME,
  API_KEY,
  API_SECRET
} = process.env


cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})


const diskStorege = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})



const fileUpload = multer({
  storage: diskStorege
}).single('image')

router.post('/post', fileUpload, async (req, res) => {
  try {
    
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    // const results = await cloudinary.v2.uploader.destroy()
    // console.log(result);
  
    const imageFromDb = await Image.create({
      title: 'titulo',
      description: 'descriotion',
      imageURL: result.secure_url
    })

    fs.unlinkSync(req.file.path)
  
    res.send(imageFromDb)
    console.log(imageFromDb);
  } catch (error) {
    console.log(error);
  }

  
})


// router.post('/post', fileUpload, async (req, res) => {
//   try {
    
//     const type = req.file.mimetype;
//     const name = req.file.originalname;
//     const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
  
//     const imageFromDb = await Image.create({
//       type,
//       name,
//       data
//     })
  
//     imageFromDb ? res.send('image created') : res.send('error');
  
//     const images = fs.readdirSync(path.join(__dirname, '../images/'))
//     images.map((img) => {
//       fs.unlinkSync(path.join(__dirname, `../images/${img}`));
//     })
//   } catch (error) {
//     res.status(400).send(error)
//   }
  
// })

router.get('/get',  async (req, res) => {
  try {
    
    const images = await Image.findAll();
    images.length ? res.status(200).json(images) : res.status(400).send({msg_error: 'No images has been found'})
  
  } catch (error) {
    console.log(error);
  }

})



// router.get('/get',  async (req, res) => {
//   try {
    
//     const imagenes = await Image.findAll();
  
//     imagenes.map(image => {
//       fs.writeFileSync(path.join(__dirname, `../dataBaseImages/${image.id}-${image.name}`),image.data)
//     })
  
//     const imagesdir = fs.readdirSync(path.join(__dirname, '../dataBaseImages/'))
  
//     res.json(imagesdir)
//   } catch (error) {
//     res.status(400).send(error)
//   }

// })



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