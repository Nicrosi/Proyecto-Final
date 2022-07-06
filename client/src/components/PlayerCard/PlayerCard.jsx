import React from "react";
import { Link } from "react-router-dom";

export const PlayerCard = ({ dni,name, last_name, picture, gender, category }) => {
  return <div>
    
    <Link to={`/players/${dni}`}>
    <p>Player: {`${name} ${last_name}`}</p>
    <img src={picture} alt="img"/>
    <p>Gender: {gender}</p>
    <p>Category: {category.type}</p>
    </Link>
   
    </div>;
};
