import React, { Component } from "react";
//import '. Local .css';
import Map from "./Map/Map";

function Local(props) {
  return (
    <Map
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_KEY
      }&v=3.exp&libraries=geometry,drawing,places`}
      containerElement={<div style={{ height: `80vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      loadingElement={<div style={{ height: `100%` }} />}
      center={{ lat: prop.lat, lng: prop.lng }}
      zoom={15}
    />
  );
}

export default Local;
