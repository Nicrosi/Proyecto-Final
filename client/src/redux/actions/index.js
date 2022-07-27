import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

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
export const PUT_TOURNAMENT = "PUT_TOURNAMENT";
export const CLEAR_USER = "CLEAR_USER";
export const CLEAR_SUBTOURNAMENT = "CLEAR_SUBTOURNAMENT";
export const ADD_SUBTOURNAMENT = "ADD_SUBTOURNAMENT";
export const GET_TOURNAMENTS = "GET_TOURNAMENTS";
export const GET_ALL_IMAGES = "GET_ALL_IMAGES";
export const GET_ALL_SUBTOURNAMENTS = "GET_ALL_SUBTOURNAMENTS";
export const PUT_SUBTOURNAMENT = "PUT_SUBTOURNAMENT";
export const CLEAR_GALLERY = "CLEAR_GALLERY";
export const GET_PLAYERS_ON_SUBT = "GET_PLAYERS_ON_SUBT";
export const GET_BY_NAME = "GET_BY_NAME";
export const CHANGE_PANEL_PAGE = "CHANGE_PANEL_PAGE";
export const GET_INSCRIPTIONS = "GET_INSCRIPTIONS";
export const GET_GESTION = "GET_GESTION";
export const PUT_GESTION = "PUT_GESTION";
export const GETPUT_GESTION = "GETPUT_GESTION";
export const GET_MATCHES = "GET_MATCHES";
export const PUT_SCORE = "GET_SCORE";
// export const getAllPlayers = () => { JSON
//   return {
//     type: GET_ALL_PLAYERS,
//     payload: players,
//   };
// };

const Url = "http://localhost:3001";
const urlUser = "http://localhost:3001/user";
const urlSponsors = "http://localhost:3001/sponsor";
const urlSubtByT = "http://localhost:3001/subtournament/ByTournament";
const urlInscription = "http://localhost:3001/inscription";
const urlTournament = "http://localhost:3001/tournament";
const urlSubTournament = "http://localhost:3001/subtournament";
const urlSponsor = "http://localhost:3001/sponsor";
const urlTournaments = "http://localhost:3001/tournament";
const urlPlayersOnSubt = "http://localhost:3001/players";
const urlGestion = "http://localhost:3001/gestion";
const urlInscriptions = "http://localhost:3001/inscription";
const urlMatches = "http://localhost:3001/matches/";
const urlScore = "http://localhost:3001/matches/putscore/";
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
export const getAllSubtournaments = () => (dispatch) => {
  return axios
    .get(urlSubTournament)
    .then((response) =>
      dispatch({
        type: GET_ALL_SUBTOURNAMENTS,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};
export const deleteSubtournament = (id_sub) => {
  return async () => {
    return await axios.delete(`${urlSubTournament}/${id_sub}`);
  };
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
        payload: response.data.value,
      })
    )
    .catch(() => {
      Swal.fire({
        title: "Error",
        text: "User not found",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    });
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

export function postSponsor(currentValue) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/gallery/logo`,currentValue.userImage)

      const input = {
        company: currentValue.userInfo.company,
        link: currentValue.userInfo.link,
        logo: data,
        message: currentValue.userInfo.message,
      };
      await axios.post(urlSponsors, input);

      return dispatch({
        type: ADD_SPONSOR,
        payload: input,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Add Sponsor error, try again later",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    }
  };
}

export const putUsers = (id_user, valuesChange) => {
  return async (dispatch) => {
    try {
      
      if(valuesChange.userImage) {
        try {
          if(valuesChange?.userInfo?.picture?.split('/')[2] === "res.cloudinary.com") {
            const public_id = valuesChange?.userInfo?.picture?.split('/')[7].split('.')[0]
            axios.delete(`http://localhost:3001/gallery/logo?public_id=${public_id}`)
          }
          const response = await axios.post(`http://localhost:3001/gallery/UserImage`,valuesChange.userImage)
          const input = {
            dni: valuesChange.userInfo.dni,
            name: valuesChange.userInfo.name,
            last_name: valuesChange.userInfo.last_name,
            is_admin: valuesChange.userInfo.is_admin,
            e_mail: valuesChange.userInfo.e_mail,
            phone: valuesChange.userInfo.phone,
            num_contact: valuesChange.userInfo.num_contact,
            picture: response.data,
            gender: valuesChange.userInfo.gender,
          };
          await axios.put(`${urlUser}/${id_user}`, input);
          const res = await axios.get(`${urlUser}/${valuesChange.userInfo.dni}`)
            console.log(res);
            return dispatch({
              type: GET_USER_BY_ID,
              payload: res.data,
            })

        } catch (error) {
          console.log(error);
        }
      }else{
        const input = {
          dni: valuesChange.userInfo.dni,
          name: valuesChange.userInfo.name,
          last_name: valuesChange.userInfo.last_name,
          is_admin: valuesChange.userInfo.is_admin,
          e_mail: valuesChange.userInfo.e_mail,
          phone: valuesChange.userInfo.phone,
          num_contact: valuesChange.userInfo.num_contact,
          picture: valuesChange.userInfo.picture,
          gender: valuesChange.userInfo.gender,
        };
        axios.put(`${urlUser}/${id_user}`, input);
      }
    } catch (error) {
      console.log(error);
    }
    
  };
};

export const putSubtournament = (id_subt, subTourn) => {
  return async (dispatch) => {
    const subtournament = {
      elimination_type: subTourn.elimination_type,
      match_type: subTourn.match_type,
      name: subTourn.name,
      numb_players: subTourn.numb_players,
      gender: subTourn.gender,
      price: subTourn.price,
      id_tournament: subTourn.id_tournament,
      id_category: subTourn.id_category,
    };
    await axios.put(`${urlSubTournament}/${id_subt}`, subtournament);
    const { data } = await axios.get(urlSubTournament);
    return dispatch({
      type: PUT_SUBTOURNAMENT,
      payload: data,
    });
  };
};

export const deleteUser = (dni) => {
  return async () => {
    return await axios.delete(`${urlUser}/${dni}`);
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
      Swal.fire({
        title: "Error",
        text: "get tournament error, try again later",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    }
  };
}
export const putTournament = (id_tournament, input) => {
  return async () => {
    const putValues = {
      name: input.name,
      date: input.date,
      location: input.location,
      earning: input.earning,
    };
    return await axios.put(`${urlTournament}/${id_tournament}`, putValues);
  };
};
export const postSubTournament = (id_tournament, input) => {
  return async (dispatch) => {
    try {
      await axios.post(`${urlSubTournament}/${id_tournament}`, input);

      return dispatch({
        type: ADD_SUBTOURNAMENT,
        payload: input,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Add subTournament error, try again later",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    }
  };
};

export const putSponsor = (id_sponsor, currentValue) => {
  return async () => {
    try {
      console.log(id_sponsor);
      const title = currentValue.userInfo.company 
      if(currentValue.userImage) {
        try {
          if(currentValue?.userInfo?.logo?.split('/')[2] === "res.cloudinary.com") {
            const public_id = currentValue?.userInfo?.logo?.split('/')[7].split('.')[0]
            axios.delete(`http://localhost:3001/gallery/logo?public_id=${public_id}`)
          }
          const response = await axios.post(`http://localhost:3001/gallery/logo`,currentValue.userImage)

          Promise.all([response]).then((value) => {
            const input = {
              company: currentValue.userInfo.company,
              message: currentValue.userInfo.message,
              logo: value[0].data,
              link: currentValue.userInfo.link,
            };

            axios.put(`${urlSponsor}/${id_sponsor}`, input);
          })
        } catch (error) {
          
        }

      } else {
        const input = {
          company: currentValue.userInfo.company,
          message: currentValue.userInfo.message,
          logo: currentValue.userInfo.logo,
          link: currentValue.userInfo.link,
        };
        await axios.put(`${urlSponsor}/${id_sponsor}`, input);
      }

    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteSponsor = (id_sponsor) => {
  return async () => {
    return await axios.delete(`${urlSponsor}/${id_sponsor}`);
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const clearSubtournament = () => {
  return {
    type: CLEAR_SUBTOURNAMENT,
  };
};

export const getSubtournament = (tournament_id) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlSubtByT}/${tournament_id}`);
    return dispatch({
      type: GET_SUBT_BY_TOURNAMENT,
      payload: response.data,
    });
  } catch (err) {
    return console.log(err);
  }
};

export const postInscription = (body) => {
  return async () => {
    try {
      const data_user = body.user;
      await axios.post(`${urlInscription}/${data_user}`, body);
      toast("Se completo el pago.", { type: "success" });
    } catch (err) {
      toast(err.response.data.Message, { type: "error" });
    }
  };
};

export const getTournament = () => {
  return async function (dispatch) {
    const answer = await axios.get(urlTournaments);
    return dispatch({
      type: GET_TOURNAMENTS,
      payload: answer.data,
    });
  };
};

export const deleteTournament = (id_tournament) => {
  return async () => {
    return await axios.delete(`${urlTournaments}/${id_tournament}`);
  };
};

export const getPLayersOnSubt = (id_subt) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${urlPlayersOnSubt}/${id_subt}`);
      return dispatch({
        type: GET_PLAYERS_ON_SUBT,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllImages = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/gallery/get");
    return dispatch({
      type: GET_ALL_IMAGES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ClearGallery = () => {
  return {
    type: CLEAR_GALLERY,
  };
};

export const getByName = (route, name) => async (dispatch) => {
  try {
    const response = await axios.get(`${Url}/${route}?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  } catch (error) {
    if (error.response.data === "User not found!") {
      Swal.fire({
        title: "Error",
        text: "User not found",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    } else if (error.response.data === "Tournament not found!") {
      Swal.fire({
        title: "Error",
        text: "Tournament not found",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    } else if (error.response.data === "Subtournament not found!") {
      Swal.fire({
        title: "Error",
        text: "Subtournament not found",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    } else if (error.response.data === "Sponsor not found!") {
      Swal.fire({
        title: "Error",
        text: "Sponsor not found",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    }
  }
};

export const changePanelPage = (page) => {
  return {
    type: CHANGE_PANEL_PAGE,
    payload: page,
  };
};

export const getInscriptions = () => {
  return async function (dispatch) {
    const answer = await axios.get(urlInscriptions);
    return dispatch({
      type: GET_INSCRIPTIONS,
      payload: answer.data,
    });
  };
};

export const getGestion = (id_gestion) => {
  return async function (dispatch) {
    const answer = await axios.get(`${urlGestion}/${id_gestion}`);
    return dispatch({
      type: GET_GESTION,
      payload: answer.data,
    });
  };
};

export const putGestion = (id_gestion, input) => {
  return async (dispatch) => {
    const putValues = {
      organizer_earnings: input.organizer_earnings,
      tennis_courts: input.tennis_courts,
      awards: input.awards,
    };
    await axios.put(`${urlGestion}/${id_gestion}`, putValues);
    const { data } = await axios.get(`${urlGestion}/${id_gestion}`);
    return dispatch({
      type: GETPUT_GESTION,
      payload: data,
    });
  };
};
export const getBracket = (id_subt) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${urlMatches}${id_subt}`);
      dispatch({
        type: GET_MATCHES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const putScore = (id_match, score) => {
  return async (dispatch) => {
    try {
      await axios.put(`${urlScore}${id_match}`, { score });
      dispatch({
        type: PUT_SCORE,
        payload: { score, id_match },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addNextRound = (subt_id, round, winners) => {
  return async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/rounds/nextround/${subt_id}`,
        {
          round_numb: round,
          winners,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};
