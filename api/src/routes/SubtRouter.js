const { Router } = require("express");
const router = Router();
const { Subtournament } = require("../db");
const {getAllSubt} = require('../utils/Subt_Controller');

router.get('/', async (req, res) => {
    let allSubt = await getAllSubt();
    allSubt.length > 0 ? res.status(200).send(allSubt) : res.status(404).send('No sub tournament found');
})

router.get('/:id', async (req, res) => {
    let {id} = req.params;
    let subt_id = await getAllSubt(id);
    subt_id.length > 0 ? res.status(200).send(subt_id) : res.status(404).send('No sub tournament found');
})

router.post('/', async (req, res) => {
    let {
        elimination_type,
        match_type,
        name,
        numb_players,
        gender
    } = req.query
    try{
        await Subtournament.create({
            elimination_type,
            match_type,
            name,
            numb_players,
            gender
        });
        res.status(200).send('Sub tournament created!');
    }catch(err){
        console.log(err);
    }
})

router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let {
        elimination_type,
        match_type,
        name,
        numb_players,
        gender
    } = req.query
    try{
        await Subtournament.update({
            elimination_type,
            match_type,
            name,
            numb_players,
            gender
        },{
            where: {
                id_subt : id
            }
        });
        res.status(200).send('Sub tournament has been updated!');
    }catch(err){
        console.log(err);
    }
})

module.exports = router;