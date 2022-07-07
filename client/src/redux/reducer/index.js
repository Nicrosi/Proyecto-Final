import{
    GET_ALL_PLAYERS,
} from "../actions"

const initialState={
    players:[],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_PLAYERS:
        return {
          ...state,
          players: action.payload.players, //devuelve el arreglo de players del json
        };

          
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;
  