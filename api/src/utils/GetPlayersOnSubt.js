const { Inscription, User, Subtournament } = require("../db");
const getPlayerOnSubt = async (id) => {
    if (id) {
        const PlayersOnSubt = await Inscription.findAll({
            where: {
                id_subt: id
            },
            include: [{
                model: User,
                attributes: ['name'],
            },
            {
                model: Subtournament,
                attributes: ['name', 'match_type', 'elimination_type'],
            }
            ]
        });
        return PlayersOnSubt;
    } 
};

module.exports = { getPlayerOnSubt };

