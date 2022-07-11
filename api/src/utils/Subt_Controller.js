const { Subtournament } = require("../db");
const sequelize = require ('sequelize');

const getAllSubt = async(id) => {
    try{
        if(id){
            const getSubtId = await Subtournament.findAll({
                where: {
                    id_subt: id
                }
            })
            return getSubtId;
        }else{
            const getSubt = await Subtournament.findAll();
            return getSubt;
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = { getAllSubt }