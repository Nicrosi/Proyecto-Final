const { User, Inscription, Category, Score } = require("../db")

const get_Userdb = async () => {

    try {
        const User_db = await User.findAll({
            include: {
                model: Inscription,
                attributes: ['amount', 'is_payed',"hola papa"],

                through: {
                    attriutes: [],
                }
            }
        })
        return User_db
    } catch (err) {
        console.log(err)
    }
}

module.exports = { get_Userdb }


// Select con todos las relaciones
// {
//     include: [
//         {
//             model: Category,
//             attributes: ['type'],
//             through: {
//                 attriutes: [],
//             }
//         },
//         {
//             model: Inscription,
//             attributes: ['amount', 'is_payed'],
//             through: {
//                 attriutes: [],
//             }
//         },
//         {
//             model: Score,
//             attributes: ['previous_tournaments', 'hit_knowledge', 'other_strokes', 'special_hits', 'kick_serve_control', 'game_strategy']
//         }
//     ]
// }


