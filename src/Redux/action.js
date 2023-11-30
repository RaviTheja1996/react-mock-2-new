import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";
import axios from "axios";

export const login = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .get("https://react-mock-2-json-server.onrender.com/users")
    .then((res) => {
      let data = res.data;
      let user = data.filter((el) => {
        if (
          el.email === credentials.email &&
          el.password === credentials.password
        ) {
          return true;
        }
      });
      if (user.length > 0) {
        dispatch({ type: LOGIN_SUCCESS, payload: user[0] });
        console.log("login success done");
      }
    })
    .catch((err) => dispatch({ type: LOGIN_FAILURE }));
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const register = (user) => (dispatch) => {
  return axios.post(
    "https://react-mock-2-json-server.onrender.com/users",
    user
  );
};
