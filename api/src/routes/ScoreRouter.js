const {Router} = require('express');
const router = Router();
const {get_ScoreUser} = require('../utils/Score_Controller');

router.get('/', async (req, res) => {
    let {id_score}= req.query
    const Score_user = await get__ScoreUser()
    
    if(id_score){
        score = await get_ScoreUser(id_score)
        score.length > 0 ? res.status(200).send(score) : res.status(404).send("Score doesn't exist!")
    }
});

router.post('/', async (req, res) => {

});