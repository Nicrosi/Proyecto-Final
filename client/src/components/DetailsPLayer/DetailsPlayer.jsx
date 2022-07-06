import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailsPlayer = (props) => {
    const params = props.match.params.dni;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            //insertar aqui una action(params)
            //crear la action y reducer que modifique player en el initialState
        )
    },[dispatch, params])

//crear estado player: {} en el initialState
    const player = useSelector(state => state.player)

    return (
        <React.Fragment>
            {
                player && (
                    <div>
                        <div>
                            <img src={player.picture} alt="perfilImg" />
                        </div>
                        <div>
                            <h1>{player.name + " " + player.last_name}</h1>
                        </div>
                        <div>
                            <h2>E-mail: 
                            {/* {player.e-mail} */}
                                </h2>
                            <h2>Gender: {player.gender}</h2>
                            <h2>Phone: {player.phone}</h2>
                            <h2>Emergency contact: {player.num_contact}</h2>
                        </div>
                        <div>
                            <h2>{player.id_Category.type}</h2>
                            <h2>Category</h2>
                            <button>Modify</button>
                        </div>
                        <div>
                            <h2>Score</h2>
                            <div>
                                <h2>Previous Tournaments: {player.id_Score.previous_tournaments}</h2>
                                <h2>Hit knowledge: {player.id_Score.hit_knowledge}</h2>
                                <h2>Other strokes: {player.id_Score.other_strokes}</h2>
                                <h2>Special hits: {player.id_Score.special_hits}</h2>
                                <h2>Kick serve control: {player.id_Score.kick_serve_control}</h2>
                                <h2>Game strategy: {player.id_Score.game_strategy}</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default DetailsPlayer;