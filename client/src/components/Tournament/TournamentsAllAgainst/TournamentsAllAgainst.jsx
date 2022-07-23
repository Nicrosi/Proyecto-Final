import React, {useEffect} from "react";
import { generateRandomDraw } from "../Tournaments/Tournaments";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPLayersOnSubt } from "../../../redux/actions/index.jsx";
// verificacion entre los inscriptos que user === team o que 2 user sean parte de un team

export const TournamentsToShowAllAgainst=()=> {
  
  
  const players = useSelector((state) => state.rootReducer.playersOnSubt);
  let team = players.map((x) => x.user.id);
  const array = team
  console.log("array",array);
  const tournaments = generateRandomDraw(array);
  console.log("tournaments", tournaments);
  const dispatch = useDispatch();
  const { subt_id } = useParams();
//   const { data: games } = generator(team, { type: "simple-cup" });

//   console.log(games, "asdasdasd");
  useEffect(() => {
    dispatch(getPLayersOnSubt(subt_id));
  }, [dispatch, subt_id]);

  return (
    <div
      style={{ paddingTop: "56px", minHeight: "100vh" }}
      className="d-flex flex-sm-column flex-column flex-lg-row flex-md-row"
    >ß
      <div>
        {tournaments}
        {/* {games.map((x) => {
          return (
            <div>
              {x.homeTeam} vs {x.awayTeam}
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
