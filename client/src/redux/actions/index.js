import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import players from "../../players.json";

// export const GET_ALL_PLAYERS = "GET_ALL_PLAYERS"; JSON

export const ORDER_USERS_BY_NAME = "ORDER_USERS_BY_NAME";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_USERS_NAME = "GET_ALL_USERS_NAME";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_ALL_SPONSORS = "GET_ALL_SPONSORS";
export const ADD_SPONSOR = "ADD_SPONSOR";
export const GET_SUBT_BY_TOURNAMENT = "GET_SUBT_BY_TOURNAMENT";
export const PUT_USERS = "PUT_USERS";
export const GET_TOURNAMENT = "GET_TOURNAMENT";
export const PUT_TOURNAMENT = "PUT_TOURNAMENT"
export const CLEAR_USER = "CLEAR_USER";

// export const getAllPlayers = () => { JSON
//   return {
//     type: GET_ALL_PLAYERS,
//     payload: players,
//   };
// };

const urlUser = "http://localhost:3001/user";
const urlSponsors = "http://localhost:3001/sponsor";
const urlSubtByT = "http://localhost:3001/subtournament/prueba";
const urlInscription = "http://localhost:3001/inscription"
const urlTournament = "http://localhost:3001/tournament";
const urlSponsor = "http://localhost:3001/sponsor"
toast.configure();


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
      await axios.post(urlSponsors, input);

      return dispatch({
        type: ADD_SPONSOR,
        payload: input,
      });
    } catch (error) {
      alert("Add Sponsor error, try again later");
    }
  };
}

export const putUsers = (dni, valuesChange) => {
  return async () => {
    const putValues = {
      name: valuesChange.name,
      last_name: valuesChange.last_name,
      is_admin: valuesChange.is_admin,
      e_mail: valuesChange.e_mail,
      phone: valuesChange.phone,
      num_contact: valuesChange.num_contact,
      picture: valuesChange.picture,
      gender: valuesChange.gender,
      // category: valuesChange.category.type
    };
    return await axios.put(`${urlUser}/${dni}`, putValues);
  };
};

export function getTournaments(id_tournament) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${urlTournament}/${id_tournament}`);

      return dispatch({
        type: GET_TOURNAMENT,
        payload: response.data,
      });
    } catch (error) {
      alert("get tournament error, try again later");
    }
  };
}
export const putTournament = (id_tournament, input) => {
  return async () => {
    const putValues = {
      date: input.date,
      location: input.location,
    };
    return await axios.put(`${urlTournament}/${id_tournament}`, putValues);
  };
};
export const putSponsor = (id_sponsor, val) => {
  return async () => {
    const putval = {
      company: val.company,
      message: val.message,
      logo: val.logo,
      link: val.link,
    };
    return await axios.put(`${urlSponsor}/${id_sponsor}`, putval);
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const getSubtournament = (tournament_id) => async (dispatch) => {
    try {
    const response = await axios
      .get(`${urlSubtByT}/${tournament_id}`);
    return dispatch({
      type: GET_SUBT_BY_TOURNAMENT,
      payload: response.data,
    });
  } catch (err) {
    return console.log(err);
  }
  
}

export const postInscription = (body) => {
  return async () => {
    try {
      const data_user = body.user
       await axios.post(`${urlInscription}/${data_user}`, body);
       toast("Se completo el pago.", {type: "success"});
    } catch (err) {
      toast(err.response.data.Message, {type: "error"});
    }
  };
};
