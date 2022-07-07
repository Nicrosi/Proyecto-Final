import React from "react";
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <>
        <div class="flex flex-col md:flex-row" >
            <div >
                <h1 > TENNIS CHAMPIONSHIP </h1>
                <div>
                    <a href="#" class="hover:text-blue-500"><button><Link to={'/HomeAdmin'}>HOME</Link></button></a>
                </div>

            </div>
        </div>
    </>
)

}
