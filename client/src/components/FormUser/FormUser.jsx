import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postNewUser } from "../../redux/actions";
import img1 from "../../img/imgForm1.webp";

export const FormUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState({
        dni: "",
        name: "",
        last_name: "",
        is_admin: false, 
        e_mail: "",
        phone: "",
        num_contact: "",
        picture: "",
        gender: ""
    })

    function handleInputChange(e) {
        e.preventDefault();
        if(e.target.type === "tel"){
            setInput({...input, [e.target.name]: parseInt(e.target.value, 10)});
        }
        if(e.target.type === "text" || e.target.type === "email"){
            setInput( prev => ({...prev, [e.target.name]: e.target.value.toLowerCase()}));
        }
        setInput(({...input, [e.target.name]: e.target.value}));
        console.log(e.target.value)

    }
    console.log(input)

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postNewUser(input));
        setInput({
            dni: "",
            name: "",
            last_name: "",
            is_admin: false, 
            e_mail: "",
            phone: "",
            num_contact: "",
            picture: "",
            gender: ""
        });
        alert("Created user");
        history.push("/HomeAdmin");
    }

    return (
        <React.Fragment>

{/* font-family: 'Bebas Neue', cursive;
font-family: 'Gruppo', cursive; */}


            <div style={{minHeight: "100vh", width:"100%"}}>
            
                <div style={{position: "absolute", top:"0", width:"100%"}}>
                <img src={img1} alt="imgNotFound" style={{width:"100%", filter: "contrast(175%) grayscale(100%) brightness(20%)", objectFit: "cover", height: "500px"}} /> 
                </div>
                
                <h1 style={{fontFamily: "'Bebas Neue', cursive", fontSize: "7rem",position: "absolute", top:"150px", marginLeft: "10%", color: "#A7D129"}}>Personal Information</h1>

                <div className="mx-auto" style={{position: "relative", marginTop: "300px", width:"60%", backgroundColor: "rgb(43, 43, 44)", borderRadius: "10px", padding: "20px"}}>
                <form style={{width:"100%"}} onSubmit={(e) => handleSubmit(e)}>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="text" value={input.name} name="name" placeholder="Write a name..." className="form-control  border-0" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Write a name...</label>
                        </div>
                        <div className="form-floating col-md">
                            <input type="text" value={input.last_name} name="last_name" placeholder="Write a last name..." className="form-control border-0" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Write a last name...</label>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="text" inputMode="numeric" pattern="\d*" value={input.dni} name="dni" placeholder="DNI..." className="form-control border-0" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">DNI</label>
                        </div>
                        <div className="form-floating col-md">
                            <select className="form-select border-0" id="floatingSelect" aria-label="Floating label select example" name='gender' onChange={(e) => handleInputChange(e)}>
                                <option value="">Open this select menu</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            <label for="floatingSelect">Gender</label>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="email" value={input.e_mail} name="e_mail" placeholder="E-mail..."className="form-control border-0" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">E-mail</label>
                        </div>
                        <div className="form-floating col-md">
                            <input type="tel" value={input.phone} name="phone" placeholder="Phone..." className="form-control border-0" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Phone</label>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="tel" value={input.num_contact} name="num_contact" placeholder="Emergency contact number..." className="form-control border-0" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Emergency contact number</label>
                        </div>
                        <div className="form-floating col-md">
                            <input type="text" value={input.picture} name="picture" placeholder="Paste an image link..." className="form-control border-0" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Paste an image link...</label>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn" style={{backgroundColor: "#A7D129"}} type="submit" >CREATE!</button>
                    </div>
                    
                </form>
            </div>
            
            </div>
        </React.Fragment>
    )
};
