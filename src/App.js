import React from "react";
import { withRouter } from "react-router-dom";
import routes from "./routes";
import Navigation from "./components/Navigation/Navigation";

function App(props) {
  return (
    <div>
      {props.location.pathname !== "/" && <Navigation />}
      {routes}
    </div>
  );
}
export default withRouter(App);
