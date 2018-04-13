import React from "react";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="app">
      <a href={process.env.REACT_APP_LOGIN}>
        <img
          src="https://image.ibb.co/fVNWj7/o_2.png"
          className="logo"
          alt="Logo"
        />
      </a>
    </div>
  );
}
