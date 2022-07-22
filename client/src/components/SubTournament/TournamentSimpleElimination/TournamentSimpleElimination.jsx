import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPLayersOnSubt } from "../../../redux/actions/index";

//////////////////////
import generator from "tournament-generator";
//////////////////////
export const TournamentSimpleElimination = () => {
  const players = useSelector((state) => state.rootReducer.playersOnSubt);
  const team = players.map((x) => x.user.name + ' ' + x.user.last_name);
  console.log(team);
  const dispatch = useDispatch();
  const { subt_id } = useParams();
  const { data: games } = generator(team, { type: "simple-cup" });

  console.log(games, "asdasdasd");
  console.log(players);
  useEffect(() => {
    dispatch(getPLayersOnSubt(subt_id));
  }, [dispatch, subt_id]);

  return (
    <div
      style={{ paddingTop: "56px", minHeight: "100vh" }}
      className="d-flex flex-sm-column flex-column flex-lg-row flex-md-row"
    >
      <div>
        {games.map((x) => {
          return (
            <div>
              {x.homeTeam} vs {x.awayTeam}
            </div>
          );
        })}
      </div>
    </div>
  );
};
