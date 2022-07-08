const {Router} = require('express');
const router = Router();
const {Score, User} = require('../db');

router.get('/', async (req, res) => {

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