import axios from "axios";
import Swal from "sweetalert2";
import { getToken, setToken, deleteToken } from "../helpers/token";

export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
export const urlAuth = "http://localhost:3001/auth";

export const postNewUser = (valuesInput) => {
  return async () => {
    try {
      if(valuesInput.userImage) {

        const title = valuesInput.userInfo.name + ' ' + valuesInput.userInfo.last_name
        const { data } = await axios.post(`http://localhost:3001/gallery/UserImage?title=${title}`,valuesInput.userImage)
  
        const input = {
          dni: valuesInput.userInfo.dni,
          name: valuesInput.userInfo.name,
          last_name: valuesInput.userInfo.last_name,
          is_admin: valuesInput.userInfo.is_admin,
          e_mail: valuesInput.userInfo.e_mail,
          password: valuesInput.userInfo.password,
          phone: valuesInput.userInfo.phone,
          num_contact: valuesInput.userInfo.num_contact,
          picture: data,
          gender: valuesInput.userInfo.gender,
        };
        return await axios.post(`${urlAuth}/register`, input);
      }
      
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Add user error, try again later",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    }
  };
};

export const postLogin = (valuesInput) => {
  return async (dispatch) => {
    try {
      const input = {
        e_mail: valuesInput.e_mail,
        password: valuesInput.password,
      };
      const response = await axios.post(`${urlAuth}/login`, input);
      const token = response.data.token;
      setToken(token);
      dispatch({ type: AUTHENTICATED, payload: response.data.user });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Login error",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#A7D129",
        cancelButtonColor: "rgb(43, 43, 44);",
        confirmButtonText: "Okey",
      });
    }
  };
};

export const logoutUser = () => {
  deleteToken();
  return { type: NOT_AUTHENTICATED };
};

export const verifyUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(urlAuth + "/verifytoken", {
        headers: {
          Authorization: getToken(),
        },
      });
      if (response.statusText === "OK") {
        if (Object.keys(response.data).length > 1)
          dispatch({ type: AUTHENTICATED, payload: response.data });
        else {
          dispatch({ type: NOT_AUTHENTICATED });
        }
      }
    } catch (err) {
      dispatch({ type: NOT_AUTHENTICATED });
    }
  };
};

export const loginGoogle = () => {
  return (dispatch) => {
    fetch(`${urlAuth}/login/google/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error("Authentication has been failed!");
      })
      .then((data) => {
        setToken(data.token);
        dispatch({ type: AUTHENTICATED, payload: data.user });
      })
      .catch((err) => console.log(err));
  };
};
