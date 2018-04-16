import React from "react";
import { connect } from "react-redux";
//import '. Local .css';
import Map from "./Map/Map";

function Local(props) {
  if (!props.lat && !props.lng) {
    props.history.push("/dashboard");
  }
  return (
    <Map
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_KEY
      }&v=3.exp&libraries=geometry,drawing,places`}
      containerElement={<div style={{ height: `80vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      loadingElement={<div style={{ height: `100%` }} />}
      center={{ lat: props.lat, lng: props.lng }}
      zoom={15}
    />
  );
}

const mapStateToProps = state => {
  return {
    ...state.authReducer,
    ...state.locationReducer
  };
};

export default connect(mapStateToProps)(Local);
