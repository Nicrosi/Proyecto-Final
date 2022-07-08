const { Score } = require("../db")
const sequelize = require ('sequelize')
const get_ScoreUser = async (id_user) => {
    try {
        if(id_user){
            const Score_user = await Score.findAll({
                where: {id_score : id_user}
            })
            return Score_user
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { get_ScoreUser }