const { Router } = require("express");
const router = Router();
const { Gestion } = require("../db");

router.get("/:id_gestion", async (req, res) => {
  const {id_gestion} = req.params
  try {
    const gestion = await Gestion.findOne({where: {
      id_gestion: id_gestion
    },
    attributes: {
      exclude: ['id_gestion']},
    }
    );
    gestion
      ? res.status(200).send(gestion)
      : res.status(404).send("Gestion doesn't exist!");
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  let { organizer_earnings, tennis_courts, awards } = req.body;
  try {
    await Gestion.findOrCreate({where:{
      organizer_earnings,
      tennis_courts,
      awards,
    }});

    res.status(200).send("Sent!");
  } catch (err) {
    console.log(err);
  }
});


router.put('/:id_gestion', async (req, res) => {
    const { id_gestion } = req.params;
  
    const gestion = await Gestion.findAll();
  
    if(gestion.length) {
  

        const GestionUpated = await Gestion.update(req.body, {
          where: {
            id_gestion: parseInt(id_gestion)
          }
        })
        
        if(GestionUpated[0] === 1) {
          res.status(200).send({msg_measge: 'Gestion updated'});
        }else{
          res.status(400).send({msg_measge: 'Gestion not found'});
        }
      
  
    }else{
      res.status(400).send({msg_measge: 'No Gestion to update'});
    }
  
  })
  
module.exports = router;
