const { Router } = require("express");
const router = Router();
const {getPlayerOnSubt} = require("../utils/GetPlayersOnSubt")

router.get("/:id_subt", async (req, res, next) => {
    const { id_subt } = req.params;
    try {
        if (id_subt) {
            const allPlayers = await getPlayerOnSubt(id_subt);
            allPlayers.length > 0
                ? res.json(allPlayers)
                : res.status(400).send("error");
        } 
    } catch (error) {
        next(error);
    }
});


module.exports = router;