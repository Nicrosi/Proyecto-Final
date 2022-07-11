import React, { useState } from "react";
import  { useDispatch, useSelector, } from 'react-redux'
import { getAllUsersName } from "../../redux/actions";
import { useLocation } from "react-router-dom"
import { useEffect } from "react";


export default function SearchBar() {
    const [inputVg,setInputVg] = useState("")
    const dispatch = useDispatch();
    const users = useSelector((state) => state.filteredUsers)

    useEffect(()=>{
    },[users,dispatch])

    const handleSubmit= function(e){
        e.preventDefault();
       
      dispatch(getAllUsersName(inputVg))
      
    }

    const handleOnChange=function(e){
        setInputVg(e.target.value)
    }

    const location = useLocation();
    if(location.pathname==="/Users"){ //si esta en home renderiza el componente de busqueda
      return (
        <form  onSubmit={(e) => handleSubmit(e)}>
          <input
          className="inputForm"
            type="text"
            placeholder="User"
            value={inputVg}
            onChange={(e) => handleOnChange(e)}
          />
          <input className="buttonForm" type="submit" value="Search" />
        </form>
      );
    }else{
      return (<div></div>)
    }
  
}
