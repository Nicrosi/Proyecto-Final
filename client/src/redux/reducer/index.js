import { ORDER_USERS_BY_NAME, GET_ALL_PLAYERS } from "../actions";
import { filterPlayers } from "../helpers/filters";
import { sortByName } from "../helpers/sorts";

const initialState = {
  players: [],
  filteredPlayers: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PLAYERS:
      return {
        ...state,
        players: action.payload.players,
        filteredPlayers: sortByName(action.payload.players),
      };
    case ORDER_USERS_BY_NAME:
      const gender = action.payload.gender,
        category = action.payload.category,
        order = action.payload.order;
      return {
        ...state,
        filteredPlayers: sortByName(
          filterPlayers(state.players, gender, category),
          order
        ),
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
