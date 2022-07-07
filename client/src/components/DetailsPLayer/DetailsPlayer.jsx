import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../../redux/actions";

const DetailsPlayer = (props) => {
  const params = props.match.params.playerId;
  const dispatch = useDispatch();
  console.log(params);

  useEffect(() => {
    dispatch(
      //insertar aqui una action que traiga el detalle a mostrar desde el back --> action(params)
      //crear la action
      getAllPlayers() //provisorio
    );
  }, [dispatch]);

  // crear estado player: {} en el initialState luego de que el back esté creado
  // y crear reducer que modifique player del initialState
  let player = useSelector((state) => state.players); //luego cambiar por state.player
  player = player[params]; //provisorio

  return (
    <React.Fragment>
      {player && (
        <div>
          <div>
            <img src={player.picture} alt="perfilImg" />
          </div>
          <div>
            <h1>{player.name + " " + player.last_name}</h1>
          </div>
          <div>
            <h2>E-mail: {player.e_mail}</h2>
            <h2>Gender: {player.gender}</h2>
            <h2>Phone: {player.phone}</h2>
            <h2>Emergency contact: {player.num_contact}</h2>
          </div>
          <div>
            <h2>Category: {player.category.type}</h2>
            <button>Modify</button>
          </div>
          <div>
            <h2>Score</h2>
            <div>
              <h2>Previous Tournaments: {player.score.previous_tournaments}</h2>
              <h2>Hit knowledge: {player.score.hit_knowledge}</h2>
              <h2>Other strokes: {player.score.other_strokes}</h2>
              <h2>Special hits: {player.score.special_hits}</h2>
              <h2>Kick serve control: {player.score.kick_serve_control}</h2>
              <h2>Game strategy: {player.score.game_strategy}</h2>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailsPlayer;
