const { User, Inscription, Category, Score } = require("../db")
const sequelize = require ('sequelize')
const get_Userdb = async (name) => {
    try {

        if(name){
            const Username_db = await User.findAll({
                where : { 
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
                }, 
                attributes: {
                    exclude: ['password']},
                include: [
                  Inscription,
                  Score,
                  Category
                ]
            })
            return Username_db
        }else{
            const User_db = await User.findAll({
                attributes: {exclude: ['password']},
      include: [
        Inscription,
        Score,
        Category
      ]
            });
            return User_db;
        }
    
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


