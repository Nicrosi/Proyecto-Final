const { Router } = require("express");
const router = Router();
const { Sponsor, Tournament, Op } = require("../db");



router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if(name) {
      const sponsor = await Sponsor.findAll({where: {company: {[Op.iLike]: `${name}%`}} })
      const Sponsors = {
        name: "sponsor",
        value: sponsor
      }
      sponsor.length ? res.status(200).json(Sponsors) : res.status(400).send('Sponsor not found!')
    }else{
      const Sponsors = await Sponsor.findAll();
    
      if (Sponsors.length) {
        return res.status(200).json(Sponsors);
      } else {
        res.status(400).json({ msg: "No sponsors found" });
      }
    }
  } catch (error) {
    console.log(error);
  }
  
});


router.post("/", async (req, res, next) => {
  try {
    const { company, message, logo, link } = req.body;
    const findSponsor = await Sponsor.findAll({
      where: {
        company: company,
      },
    });

    if (findSponsor.length !== 0) {
      res.status(403).send("This sponsor already exists");
    } else {
      await Sponsor.create({
        company,
        message,
        logo,
        link,
      });
      res.send("Sponsor created!");
    }
  } catch (error) {
    next(error.message);
  }
});



router.put('/:id_sponsor', async (req, res) => {
  const { id_sponsor } = req.params;
  const { company, link } = req.body;

  const AllSponsor = await Sponsor.findAll();

  if(AllSponsor.length) {

    let compare = false
    let SponsorFromDb = await Sponsor.findOne({where: {id_sponsor}})



    if(SponsorFromDb.link !== link) {

      AllSponsor.map((sponsor) => {
        if( link === sponsor.link ){
          compare = true
        }
      })
    }

    if(!compare) {
      const SponsorUpated = await Sponsor.update(req.body, {
        where: {
          id_sponsor: parseInt(id_sponsor)
        }
      })
      
      if(SponsorUpated[0] === 1) {
        res.status(200).send({msg_measge: 'Sponsor updated'});
      }else{
        res.status(400).send({msg_measge: 'Sponsor not found'});
      }
    }else{
      return res.status(400).send({msg_error: 'Link already exist'})
    }

  }else{
    res.status(400).send({msg_measge: 'No sponsor to update'});
  }

})

router.delete('/:id_sponsor', async (req, res) => {
  const { id_sponsor } = req.params;

  const imageDeleted = await Sponsor.destroy({ where: { id_sponsor: id_sponsor } })
  imageDeleted === 1 ? res.status(200).send({msg: 'Sponsor deleted successfully'}) : res.status(400).send({msg: 'Sponsor does not exist'})

})


module.exports = router;
