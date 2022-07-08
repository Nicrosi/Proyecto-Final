import React from "react";
import { Link } from "react-router-dom";

export const UserCard = ({ dni,name, last_name, picture, gender, category }) => {
  return <div>
    
    <Link to={`/Users/${dni}`}>
    <p>User: {`${name} ${last_name}`}</p>
    <img src={picture} alt="img"/>
    <p>Gender: {gender}</p>
    {/* <p>Category: {category.type}</p> no se recibe category aun*/}
    </Link>
   
    </div>;
};
