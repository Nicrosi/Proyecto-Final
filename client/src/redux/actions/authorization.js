import axios from "axios";

import { getToken, setToken, deleteToken } from "../helpers/token";

export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
const urlAuth = "http://localhost:3001/auth";

export const postNewUser = (valuesInput) => {
  return async () => {
    try {
      const input = {
        dni: valuesInput.dni,
        name: valuesInput.name,
        last_name: valuesInput.last_name,
        is_admin: valuesInput.is_admin,
        e_mail: valuesInput.e_mail,
        password: valuesInput.password,
        phone: valuesInput.phone,
        num_contact: valuesInput.num_contact,
        picture: valuesInput.picture,
        gender: valuesInput.gender,
      };
      return await axios.post(`${urlAuth}/register`, input);
    } catch (err) {
      alert("Add user error, try again later");
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
      alert("Login error");
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
