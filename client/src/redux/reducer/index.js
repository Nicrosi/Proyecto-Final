
import { ORDER_USERS_BY_NAME, GET_ALL_PLAYERS } from "../actions";
import { filterByGender } from "../helpers/filters";
import { sortByName } from "../helpers/sorts";


const initialState = {
  players: [],
  filterPlayers: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PLAYERS:
      return {
        ...state,
        players: action.payload.players,
        filterPlayers: sortByName(action.payload.players),
      };
    case ORDER_USERS_BY_NAME:
      return {
        ...state,
        filterPlayers: sortByName(
          filterByGender(state.players, action.payload.gender),
          action.payload.order
        ),
      };
    default:
      return { ...state };
  }
};
          
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;
  

