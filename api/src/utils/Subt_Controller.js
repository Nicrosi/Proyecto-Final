const { Tournament, Subtournament,Category } = require("../db");
const sequelize = require ('sequelize');

const getAllSubt = async(id) => {
    try{
        if(id){
            const getSubtId = await Subtournament.findAll({
                where: {
                    id_subt: id
                },
                include: [
                    Category,
                    Tournament
                  ]
            })
            return getSubtId;
        }else{
            const getSubt = await Subtournament.findAll({
                include: [
                    Category,
                    Tournament
                  ]
            });
            return getSubt;
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = { getAllSubt }