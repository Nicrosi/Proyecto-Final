import { ORDER_USERS_BY_NAME, GET_ALL_USERS } from "../actions";
import { filterUsers } from "../helpers/filters";
import { sortByName } from "../helpers/sorts";

const initialState = {
  // players: [], JSON
  // filteredPlayers: [],
  users: [],
  filteredUsers:[]
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
        users: action.payload.allUsers,
        filteredUsers: sortByName(action.payload.allUsers),
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
    default:
      return { ...state };
  }
};

export default rootReducer;
