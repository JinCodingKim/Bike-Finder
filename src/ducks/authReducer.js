import axios from "axios";

const GET_USER = "GET_USER";

const initialState = {
  user: [],
  loading: false
};

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/user")
  };
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    default:
      return state;
  }
}
