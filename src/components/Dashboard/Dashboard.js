import React, { Component } from "react";
import Geocode from "react-geocode";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/authReducer";
import { handleLocation } from "../../ducks/locationReducer";
import "./Dashboard.css";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      address: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  componentDidMount() {
    const { getUser, handleLocation } = this.props;
    getUser();
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(position => {
    //       handleLocation({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       });
    //     });
    //   }
  }

  handleChange(val) {
    this.setState({
      address: val
    });
  }

  handleAddress(event) {
    const { user, handleLocation, history } = this.props;
    if (event.keyCode === 13) {
      // if (!user.length) {
      //   history.push("/");
      // } else {
      Geocode.fromAddress(this.state.address)
        .then(response => {
          const { lat, lng } = response.results[0].geometry.location;
          handleLocation({ lat, lng });
        })
        .then(() => {
          history.push("/local");
        })
        .catch(err => console.log(err));
      // }
    }
  }

  render() {
    const { history, lat, lng } = this.props;
    const { address, modal } = this.state;

    if (lat && lng) {
      history.push("/local");
    }

    return (
      <div className="dashboard-main">
        <h6 className="address-title">Find Bikes Nearby</h6>
        <input
          className="address-input"
          onKeyDown={this.handleAddress}
          onChange={e => this.handleChange(e.target.value)}
          value={address}
          placeholder="Enter Address"
          type="text"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.authReducer,
    ...state.locationReducer
  };
};

export default connect(mapStateToProps, { getUser, handleLocation })(Dashboard);
