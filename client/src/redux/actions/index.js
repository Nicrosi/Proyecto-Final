import axios from "axios";
import players from "../../players.json"

export const GET_ALL_PLAYERS = "GET_ALL_PLAYERS";

export const getAllPlayers =()=>{
    return{
        type:GET_ALL_PLAYERS,
        payload: players
    }
}