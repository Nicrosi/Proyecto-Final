import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubtournament } from "../../redux/actions";
import SubtCard from "./SubtCard";

export const Inscription = () => {
  const subt = useSelector((state) => state.filteredSubt)
  const dispatch = useDispatch();
  const {tournament_id} = useParams();

  useEffect(() => {
    dispatch(getSubtournament(tournament_id));
  }, [dispatch, tournament_id])
  return (
    <div> 
     {subt.length > 0 ? (
            subt.map((p) => {
              return (
                <div key={p.id_subt}>
                  <SubtCard
                    key={p.id_subt}
                    name={p.name}
                    id_tournament={tournament_id}
                    price={p.price}
                  />
                </div>
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>No sub tournament found</h1>
          )}
    </div>
  );
}