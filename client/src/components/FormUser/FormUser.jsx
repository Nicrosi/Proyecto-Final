import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postNewUser } from "../../redux/actions";

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

            <div className="mx-5" style={{margin: "100px auto", }}>
                <h1>User registration</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="text" value={input.name} name="name" placeholder="Write a name..." class="form-control" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Write a name...</label>
                        </div>
                        <div className="form-floating col-md">
                            <input type="text" value={input.last_name} name="last_name" placeholder="Write a last name..." class="form-control" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Write a last name...</label>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="text" inputMode="numeric" pattern="\d*" value={input.dni} name="dni" placeholder="DNI..." class="form-control" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">DNI</label>
                        </div>
                        <div className="form-floating col-md">
                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='gender' onChange={(e) => handleInputChange(e)}>
                                <option value="">Open this select menu</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            <label for="floatingSelect">Gender</label>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="email" value={input.e_mail} name="e_mail" placeholder="E-mail..."class="form-control" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">E-mail</label>
                        </div>
                        <div className="form-floating col-md">
                            <input type="tel" value={input.phone} name="phone" placeholder="Phone..."class="form-control" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Phone</label>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="form-floating col-md">
                            <input type="tel" value={input.num_contact} name="num_contact" placeholder="Emergency contact number..."class="form-control" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Emergency contact number</label>
                        </div>
                        <div className="form-floating col-md">
                            <input type="text" value={input.picture} name="picture" placeholder="Paste an image link..."class="form-control" id="floatingInput" onChange={(e) => handleInputChange(e)} />
                            <label for="floatingInput">Paste an image link...</label>
                        </div>
                    </div>
                    <div class="d-grid gap-2">
                        <button className="btn btn-dark" type="submit" >CREATE!</button>
                    </div>
                    
                </form>
            </div>
            

        </React.Fragment>
    )
};
