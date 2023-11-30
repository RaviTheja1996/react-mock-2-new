import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  username: "",
  avatar: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        username: payload.username,
        avatar: payload.avatar,
      };
    }
    case LOGIN_FAILURE: {
      return { ...state, isError: true, isLoading: false, isAuth: false };
    }
    case LOGOUT: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        isAuth: false,
        username: "",
        avatar: "",
      };
    }
    default:
      return state;
  }
};
