const { Router } = require("express");
const router = Router();
const { Inscription } = require("../db");
const { getIscription } = require("../utils/Inscription_Controller");
const {createPayment} = require("../utils/Payment_controller");


router.get("/", async (req, res, next) => {
  const { id_inscription } = req.query;
  try {
    if (id_inscription) {
      const allInscription = await getIscription(id_inscription);
      allInscription.length > 0
        ? res.json(allInscription)
        : res.status(400).send("the inscription was not found");
    } else {
      const allInscription = await getIscription();
      res.json(allInscription);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const {product, token} = req.body;    
    const charge = await createPayment([product, token]); 
    console.log(charge)
    if(typeof charge === 'string'){
      res.status(404).send({Message: charge})
    }else{
      try {
        await Inscription.create({
           description: product.name,
           amount: product.price,
           is_payed : true,
           id_user: id,
           id_tournament: product.id_tournament
         });
         res.status(200).send("Inscription created!");    
       } catch (error) {
         console.log(error);
       }
    }
     
     
  
    
})

module.exports = router;
