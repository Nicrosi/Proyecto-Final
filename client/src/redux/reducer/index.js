import {
  ORDER_USERS_BY_NAME,
  GET_ALL_USERS,
  GET_ALL_USERS_NAME,
  GET_USER_BY_ID,
  ADD_SPONSOR,
  GET_ALL_SPONSORS,
  GET_SUBT_BY_TOURNAMENT,
  CLEAR_USER,
  CLEAR_SUBTOURNAMENT,
  GET_TOURNAMENTS,
  GET_ALL_IMAGES,
  GET_ALL_SUBTOURNAMENTS,
  PUT_SUBTOURNAMENT,
  CLEAR_GALLERY,
  GET_PLAYERS_ON_SUBT,
  ADD_MATCH,
} from "../actions";
import { filterUsers } from "../helpers/filters";
import { sortByName } from "../helpers/sorts";

const initialState = {
  // players: [], JSON
  // filteredPlayers: [],
  users: [],
  user: {},
  filteredUsers: [],
  sponsors: [],
  filteredSubt: [],
  tournaments:[],
  subtournaments:[],
  gallery:[],
  FirstLine:[],
  SecondLine:[],
  ThirdLine:[],
  ImageLoading: false,
  playersOnSubt:[],
  match:[],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_ALL_PLAYERS: JSON
    //   return {
    //     ...state,
    //     players: action.payload.players,
    //     filteredPlayers: sortByName(action.payload.players),
    //   };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        filteredUsers: sortByName(action.payload),
      };

    case GET_ALL_USERS_NAME:
      return {
        ...state,
        users: action.payload,
        filteredUsers: sortByName(action.payload),
      };

    case ORDER_USERS_BY_NAME:
      const gender = action.payload.gender,
        category = action.payload.category,
        order = action.payload.order;
      return {
        ...state,
        filteredUsers: sortByName(
          filterUsers(state.users, gender, category),
          order
        ),
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
      };

    case ADD_SPONSOR:
      console.log("action", action.payload);
      return {
        ...state,
        sponsors: [...state.sponsors, action.payload],
      };

    case GET_ALL_SPONSORS:
      return {
        ...state,
        sponsors: action.payload,
      };
    case GET_SUBT_BY_TOURNAMENT:
      return {
        ...state,
        filteredSubt: action.payload,
      }    
    case CLEAR_USER:
      return {
        ...state,
        user: {},
      };
    case CLEAR_SUBTOURNAMENT:
      return {
        ...state,
        subtournaments: []
      };
      case GET_TOURNAMENTS:
        return {
          ...state,
          tournaments: action.payload
        }
      case GET_ALL_SUBTOURNAMENTS:
        return {
          ...state,
          subtournaments: action.payload
        }
      case PUT_SUBTOURNAMENT:
        return {
          ...state,
          subtournaments: action.payload
        }
      case CLEAR_GALLERY:
        return {
          ...state,
          FirstLine: [],
          SecondLine: [],
          ThirdLine: [],
          ImageLoading: true
        }
        case GET_PLAYERS_ON_SUBT:
        return {
          ...state,
          playersOnSubt: action.payload
        }
      case GET_ALL_IMAGES:
        const images = [...action.payload];
        let firstLine = [];
        let secondLine = [];
        let thirdLine = [];
        while(images.length) {
          images.length && firstLine.push(images.shift())
          images.length && secondLine.push(images.shift())
          images.length && thirdLine.push(images.shift())
        }
        return {
          ...state,
          gallery: action.payload,
          FirstLine: firstLine,
          SecondLine: secondLine,
          ThirdLine: thirdLine,
          ImageLoading: false,
        }

        case ADD_MATCH:
      console.log("action", action.payload);
      return {
        ...state,
        match: [...state.match, action.payload],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
