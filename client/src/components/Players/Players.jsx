import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../../redux/actions";
import Filter from "../Filter/Filter";
import { PlayerCard } from "../PlayerCard/PlayerCard";

export const Players = () => {
  const players = useSelector((state) => state.filteredPlayers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);

  return (
    <div>
      <Filter />
      {players.map((p) => {
        return (
          <PlayerCard
            key={p.dni}
            dni={p.dni}
            name={p.name}
            last_name={p.last_name}
            picture={p.picture}
            gender={p.gender}
            category={p.category}
          />
        );
      })}
    </div>
  );
};
