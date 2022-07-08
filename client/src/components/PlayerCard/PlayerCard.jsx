import React from "react";
import { Link } from "react-router-dom";

export const PlayerCard = ({
  dni,
  name,
  last_name,
  picture,
  gender,
  category,
}) => {
  return (
    <div className="mx-4 my-4">
      <div className='card mx-4 my-3 shadow-lg'  style={{width:'50rem'}}>
        <div className="row">
        <div className="col">
          <Link to={`/players/${dni}`}>
    
            <img
              className="col"
              src="https://picsum.photos/250/300"
              alt="img"
            /></Link>
            </div>
            
            <div className="col">
              <h3 className="text-muted">
                Player: {`${name} ${last_name}`}
              </h3>
              <h3 className="col text-italic">
                Gender: {gender}
              </h3>
              
              
              <img
              className="col align-self-center "
              src="https://picsum.photos/100/100"
              alt="img"
            />
            <h3 className="col ">
                Category: {category.type}
              </h3></div>
          
        </div>
      </div>
    </div>
  );
};
