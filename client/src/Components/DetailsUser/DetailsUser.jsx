import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";

const DetailsUser = (props) => {
  const params = props.match.params.userId;
  const dispatch = useDispatch();
  console.log(params);

  useEffect(() => {
    dispatch(
      //insertar aqui una action que traiga el detalle a mostrar desde el back --> action(params)
      //crear la action
      getAllUsers() //provisorio
    );
  }, [dispatch]);

  // crear estado user: {} en el initialState luego de que el back esté creado
  // y crear reducer que modifique user del initialState
  let user = useSelector((state) => state.users); //luego cambiar por state.user
  user = user[params]; //provisorio

  return (
    <React.Fragment>
      {user && (
        <div>
          <div>
            <img src={user.picture} alt="perfilImg" />
          </div>
          <div>
            <h1>{user.name + " " + user.last_name}</h1>
          </div>
          <div>
            <h2>E-mail: {user.e_mail}</h2>
            <h2>Gender: {user.gender}</h2>
            <h2>Phone: {user.phone}</h2>
            <h2>Emergency contact: {user.num_contact}</h2>
          </div>
          {/* <div> //AUN NO ESTA LLEGANDO EL USER CON LA CATEGORIA
            <h2>Category: {user.category.type}</h2>
            <button>Modify</button>
          </div>
          <div>//AUN NO ESTA LLEGANDO EL USER CON EL SCORE
            <h2>Score</h2>
            <div> 
              <h2>Previous Tournaments: {user.score.previous_tournaments}</h2>
              <h2>Hit knowledge: {user.score.hit_knowledge}</h2>
              <h2>Other strokes: {user.score.other_strokes}</h2>
              <h2>Special hits: {user.score.special_hits}</h2>
              <h2>Kick serve control: {user.score.kick_serve_control}</h2>
              <h2>Game strategy: {user.score.game_strategy}</h2>
            </div>
          </div> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailsUser;
