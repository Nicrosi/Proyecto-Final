const {Router} = require('express');
const router = Router();
const {Score, User} = require('../db');
const {get_ScoreUser} = require('../utils/Score_Controller');

router.get('/', async (req, res) => {
    let {id_score}= req.query
    const Score_user = await get_ScoreUser()
    
    if(id_score){
        const score = await get_ScoreUser(id_score)
        score.length > 0 ? res.status(200).send(score) : res.status(404).send("Score doesn't exist!")
    }
});

router.post('/:dni', async (req, res) => {
    let {dni} = req.params;
    let{
        previous_tournaments,
        hit_knowledge,
        other_strokes,
        special_hits,
        kick_serve_control,
        game_strategy
    } = req.body;
    try{
        let newScore = await Score.create({
            previous_tournaments,
            hit_knowledge,
            other_strokes,
            special_hits,
            kick_serve_control,
            game_strategy
        });
        let user = await User.findAll({
            where : {
                dni: dni
            }
        });
        newScore.addScore(user);
        res.status(200).send('Sent!');
    }catch(err){
        console.log(err);
    }
});

