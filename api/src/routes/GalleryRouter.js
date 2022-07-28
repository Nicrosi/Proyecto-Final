const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Image } = require('../db.js');
const { Router } = require("express");

const cloudinary = require('cloudinary');
require('dotenv').config();

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
    const { title } = req.query;
    const result = await cloudinary.v2.uploader.upload(req.file.path)
  
    const imageFromDb = await Image.create({
      public_id: result.public_id,
      title,
      imageURL: result.secure_url
    })

    fs.unlinkSync(req.file.path)
  
    res.send('Image created')
  } catch (error) {
    console.log(error);
  }
})



router.post('/logo', fileUpload, async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
  
    const image =  result.secure_url

    fs.unlinkSync(req.file.path)
  
    res.send(image)
  } catch (error) {
    console.log(error);
  }
})



router.post('/UserImage', fileUpload, async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const UserImage = result.secure_url
    fs.unlinkSync(req.file.path)
  
    res.send(UserImage)
  } catch (error) {
    console.log(error);
  }
})


router.get('/get',  async (req, res) => {
  try {
    
    const Images = await Image.findAll({where: {user_image: false}});
    // const Images = images.sort((a, b) => a.id - b.id)
    res.status(200).json(Images);
  
  } catch (error) {
    console.log(error);
  }

})



router.delete('/delete', async (req, res) => {
  try {
    
    const { image_id, public_id } = req.query;
    await cloudinary.v2.uploader.destroy(public_id);
    const imageDeleted = await Image.destroy({ where: { id_image: parseInt(image_id) } })

    imageDeleted === 1 ? res.status(200).send({msg: 'Image deleted successfully'}) : res.status(400).send({msg: 'Image does not exist'})
  } catch (error) {
    res.status(400).send(error)
  }
})


router.delete('/Logo', async (req, res) => {
  try {
    
    const { public_id } = req.query;
    const result = await cloudinary.v2.uploader.destroy(public_id);

    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})


module.exports = router;