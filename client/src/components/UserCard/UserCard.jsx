import React from "react";
import { Link } from "react-router-dom";

export const UserCard = ({ dni,name, last_name, picture, gender }) => {
  return (
    <div className="mx-4 my-4">
      <div className='card mx-4 my-3 shadow-lg'  style={{width:'50rem'}}>
        <div className="row">
        <div className="col">
          <Link to={`/Users/${dni}`}>
    
            <img
              className="col"
              src="https://picsum.photos/250/300"
              alt="img"
            /></Link>
            </div>
            
            <div className="col">
              <h3 className="text-muted">
               User: {`${name} ${last_name}`}
              </h3>
              <h3 className="col text-italic">
                Gender: {gender}
              </h3>
              
              
              <img
              className="col align-self-center "
              src={picture}
              alt="img"
            />
            {/* <h3 className="col ">
                Category: {category.type}
              </h3> */}
              
              </div>
          
        </div>
      </div>
    </div>
  );
};
