const {Sponsor, Tournament} = require('../db');
const { Router } = require('express');
const RouteUser = require('../routes/UserRouter')
const router = Router();
const category = require("../routes/CategoryRouter.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/category", category);
router.use('/user', RouteUser)


router.post('/sponsor', async (req, res) => {
  const { company, message, logo, link, } = req.body;

  const sponsor = await Sponsor.create(
    {
      company, 
      message, 
      logo, 
      link,
    }
  )
   
  res.send(sponsor)
})


router.post('/tornament/:id_sponsor', async (req, res) => {
  const { date, location } = req.body;
  const { id_sponsor } = req.params;

  const sponsor = await Sponsor.findOne(
    {
      where: {
        id_sponsor: id_sponsor
      }
    }
  )

  const tournament = await Tournament.create(
    {
      date, 
      location
    }
  )

  await sponsor.addTournament(tournament)
   
  res.send(tournament)
})

module.exports = router;
