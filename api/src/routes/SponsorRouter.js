const { Router } = require('express');
const router = Router();
const {Sponsor, Tournament} = require('../db');

router.get('/', async (req, res) => {
  const { id_tournament } = req.query;

  if( id_tournament ) {
    const tournament = await Tournament.findOne(
      {
        where : {
          id_tournament: parseInt(id_tournament)
        },
        include: Sponsor
      }
    )

    if(tournament) {

      const Sponsors = []

      tournament.sponsors.map((sponsor) => {
        const Sponsor = {
          id_sponsor: sponsor.id_sponsor,
          company: sponsor.company,
          message: sponsor.message,
          logo: sponsor.logo,
          link: sponsor.link,
        }
        Sponsors.push(Sponsor)
      })

      return res.status(200).json(Sponsors)
    }else{
      res.status(400).json({msg: 'No sponsors found'});
    }
  }else{

    const Sponsors = await Sponsor.findAll();
  
    if(Sponsors.length) {
      return res.status(200).json(Sponsors);
    }else{
      res.status(400).json({msg: 'No sponsors found'});
    }
  }

})


router.put('/:id_sponsor', async (req, res) => {
  const { id_sponsor } = req.params;
  const { company, link } = req.body;

  const AllSponsor = await Sponsor.findAll();

  if(AllSponsor.length) {

    let comparison = false

    AllSponsor.map((sponsor) => {
      if( company === sponsor.company || link === sponsor.link ){
        comparison = true
      }
    })

    if(!comparison) {
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
      return res.status(400).send({msg_error: 'Sponsor already exists'})
    }

  }else{
    res.status(400).send({msg_measge: 'No sponsor to update'});
  }

})

module.exports = router;
