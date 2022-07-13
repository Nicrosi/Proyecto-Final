import axios from "axios";
//import players from "../../players.json";

// export const GET_ALL_PLAYERS = "GET_ALL_PLAYERS"; JSON

export const ORDER_USERS_BY_NAME = "ORDER_USERS_BY_NAME";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_USERS_NAME = "GET_ALL_USERS_NAME";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_ALL_SPONSORS = "GET_ALL_SPONSORS";
export const ADD_SPONSOR = "ADD_SPONSOR";
// export const getAllPlayers = () => { JSON
//   return {
//     type: GET_ALL_PLAYERS,
//     payload: players,
//   };
// };

const urlUser = "http://localhost:3001/user";
const urlSponsors = "http://localhost:3001/sponsor";

export const getAllUsers = () => (dispatch) => {
  return axios
    .get(urlUser)
    .then((response) =>
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getAllSponsors = () => (dispatch) => {
  return axios
    .get(urlSponsors)
    .then((response) =>
      dispatch({
        type: GET_ALL_SPONSORS,
        payload: response.data,
      })
    )
    .catch(() => console.log("No sponsors found"));
};

export const getAllUsersName = (name) => (dispatch) => {
  return axios
    .get(`${urlUser}${name ? "?name=" + name : ""}`)
    .then((response) =>
      dispatch({
        type: GET_ALL_USERS_NAME,
        payload: response.data,
      })
    )
    .catch(() => alert("User not found"));
};

export const orderUsersByName = ({ order, gender, category }) => {
  return {
    type: ORDER_USERS_BY_NAME,
    payload: { order, gender, category },
  };
};

export const getUserById = (dni) => (dispatch) => {
  return axios
    .get(`${urlUser}/${dni}`)
    .then((response) =>
      dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export function postSponsor(input) {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3001/sponsor", input);

      return dispatch({
        type: ADD_SPONSOR,
        payload: input,
      });
    } catch (error) {
      alert("Add Sponsor error, try again later");
    }
  };
}

export const postNewUser = (valuesInput) => {
  return async () => {
    try {
      const input = {
        dni: valuesInput.dni,
        name: valuesInput.name,
        last_name: valuesInput.last_name,
        is_admin: valuesInput.is_admin,
        e_mail: valuesInput.e_mail,
        phone: valuesInput.phone,
        num_contact: valuesInput.num_contact,
        picture: valuesInput.picture,
        gender: valuesInput.gender,
      };
      return await axios.post(urlUser, input);
    } catch (err) {
      alert("Add user error, try again later");
    }
  };
};
