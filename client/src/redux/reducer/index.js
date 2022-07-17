import {
  ORDER_USERS_BY_NAME,
  GET_ALL_USERS,
  GET_ALL_USERS_NAME,
  GET_USER_BY_ID,
  ADD_SPONSOR,
  GET_ALL_SPONSORS,
  GET_SUBT_BY_TOURNAMENT,
  CLEAR_USER,
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
  filteredSubt: []
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
        filteredUsers: sortByName(action.payload).filter(user=>user.is_admin !== true),
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
    default:
      return { ...state };
  }
};

export default rootReducer;
