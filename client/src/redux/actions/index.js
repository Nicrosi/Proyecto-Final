import axios from "axios";
//import players from "../../players.json";

// export const GET_ALL_PLAYERS = "GET_ALL_PLAYERS"; JSON

export const ORDER_USERS_BY_NAME = "ORDER_USERS_BY_NAME";
export const GET_ALL_USERS = "GET_ALL_USERS";

// export const getAllPlayers = () => { JSON
//   return {
//     type: GET_ALL_PLAYERS,
//     payload: players,
//   };
// };

const urlUser = "http://localhost:3001/user";

export const getAllUsers = () => (dispatch) => {
  return axios.get(urlUser).then((response) =>
    dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    })
  );
};

export const orderUsersByName = ({ order, gender, category }) => {
  return {
    type: ORDER_USERS_BY_NAME,
    payload: { order, gender, category },
  };
};

