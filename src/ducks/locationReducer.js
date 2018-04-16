import axios from "axios";

const HANDLE_LOCATION = "HANDLE_LOCATION";

const initialState = {
  lat: 0,
  lng: 0
};

export function handleLocation(location) {
  return {
    type: HANDLE_LOCATION,
    payload: location
  };
}

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_LOCATION:
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng
      };
    default:
      return state;
  }
}
