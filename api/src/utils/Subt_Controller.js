const { Subtournament,Category, User} = require("../db");
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
                  ]
            })
            return getSubtId;
        }else{
            const getSubt = await Subtournament.findAll({
                include: [
                    Category,
                  ]
            });
            return getSubt;
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = { getAllSubt }