const {Router} = require('express');
const router = Router();
const { Team, User, Match } = require('../db');



router.get('/', async (req, res) => {
  const Teams = await Team.findAll();
  Teams.length ? res.status(200).json(Teams) : res.status(400).send({msg_error: 'No teams found'});
})

router.get('/:id_team', async (req, res) => {
  const { id_team } = req.params;
  const team = await Team.findOne({
    where: {
      id_team: parseInt(id_team)
    },
    include: [
      User,
      Match
    ]
  })

  team ? res.status(200).json(team) : res.status(400).send({msg_error: 'Team not found'})

})


router.post('/', async (req, res, next) => {

  const { points, accumulated_points } = req.body;
  if(!points || !accumulated_points) return res.status(404).send({msg_error: 'Missing team properties'})

  await Team.create(
    {
      points,
      accumulated_points
    }
  )

  res.send({msg_mesage: 'Team created successfully'})

})


router.put('/:id_team', async (req, res) => {
  const { id_team } = req.params;

  const TeamUpdated = await Team.update(req.body, {
    where: { 
      id_team: parseInt(id_team)
    }
  })

  TeamUpdated[0] === 1 ? res.status(200).send({msg_mesage: 'Team Updated'}) : res.send({msg_mesage: 'Team not found'})

})

module.exports = router;