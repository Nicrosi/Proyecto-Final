const { Router } = require("express");
const router = Router();
const { Tournament, Subtournament, Op } = require('../db');

router.get('/', async (req, res) => {
  const { name } = req.query;  //http://localhost:3001/${tournament}?name=${name}
  if(name) {
    const Tournaments = await Tournament.findAll({where: {name: {[Op.iLike]: `${name}%`}}});
    const tournaments = {
      name: "tournament",
      value: Tournaments
    }
    Tournaments.length ? res.status(200).json(tournaments) : res.status(404).send('Tournament not found!')
  }else{

    const Tournaments = await Tournament.findAll();
    if(!Tournaments.length) return res.status(404).send({msg_errors: 'Not tournament found!'})
  
    res.status(200).send(Tournaments)
  }

})

router.get('/:id_tournament', async (req, res) => {
  const { id_tournament } = req.params;

  const tournamentFromDb = await Tournament.findOne({
    where: {
      id_tournament: parseInt(id_tournament)
    },
    include: Subtournament
  })

  tournamentFromDb ? res.status(200).send(tournamentFromDb) : res.status(404).send({msg_error: 'Tournament not found!'});

})

router.post('/', async (req, res) => {
  const { name, date, location } = req.body;
  if(!name || !date || !location) return res.send({msg_error: 'Error'})

  // Date format "AAAA-MM-DD"
  let Date = date.split('-')
  if(parseInt(Date[1]) > 12 || parseInt(Date[2]) > 31 ) return res.status(404).send({msg_error: 'Invalid date'})
  // const tournamentFromDb = await Tournament.findOne({ where: { location: location }})

  await Tournament.create(
    {
      name,
      date,
      location,
      earnings: 0
    }
  )

  res.send({msg_mesage: 'Tournament created successfully'});

})

router.put('/:id_tournament', async (req, res) => {
  const { id_tournament } = req.params; 

  // Date format "AAAA-MM-DD"

  let Date = req.body.date && req.body.date.split('-')
  if(req.body.date) {
    if(parseInt(Date[1]) > 12 || parseInt(Date[2]) > 31 ) return res.status(404).send({msg_error: 'Invalid date'})
  }

  const tournament = await Tournament.findByPk(id_tournament)

  if(tournament) {
    await Tournament.update(req.body,{
      where: {
        id_tournament: parseInt(id_tournament)
      }
    })

    res.status(200).send({msg_mesage: 'Tournament Upated'});
    
  }else{
    res.status(400).send({msg_mesage: 'Tournament not found'});
  }
})


router.delete('/:id_tournament', async (req, res) => {
  const { id_tournament } = req.params;
  const tour = await Tournament.findOne({where: {id_tournament: id_tournament}, include: Subtournament})
  if( tour && tour.subtournaments.length) {
    for (let i = 0; i < tour.subtournaments.length; i++) {
      await Subtournament.destroy({where: {id_subt: tour.subtournaments[i].id_subt}})
    }
  }
  const tournament = await Tournament.destroy({where: {id_tournament: id_tournament}})
  tournament === 1 ? res.status(200).send({msg: 'tournament deleted successfully'}) : res.status(400).send({msg: 'tournament does not exist'})
})


module.exports = router;