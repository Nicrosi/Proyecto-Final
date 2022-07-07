/* import axios from "axios"; */
import players from "../../players.json";

export const GET_ALL_PLAYERS = "GET_ALL_PLAYERS";
export const ORDER_USERS_BY_NAME = "ORDER_USERS_BY_NAME";


export const getAllPlayers = () => {
  return {
    type: GET_ALL_PLAYERS,
    payload: players,
  };
};

export const orderUsersByName = ({ order, gender }) => {
  return {
    type: ORDER_USERS_BY_NAME,
    payload: { order, gender },
  };
};

