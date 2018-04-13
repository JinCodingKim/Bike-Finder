import React, { Component } from "react";
import Geocode from "react-geocode";
import { connect } from "react-redux";
import { getUser } from "../../ducks/authReducer";
import "./Dashboard.css";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      lat: 32.7773313,
      lng: -96.7954995
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
  }

  handleChange(val) {
    this.setState({
      address: val
    });
  }

  handleAddress(event) {
    if (event.keyCode === 13) {
      Geocode.fromAddress(this.state.address)
        .then(response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({
            lat,
            lng
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    console.log(this.props);
    !this.props.user && 
    return (
      <div className="dashboard-main">
        <h6 className="address-title">Find Bikes Nearby</h6>
        <input
          className="address-input"
          onKeyDown={this.handleAddress}
          onChange={e => this.handleChange(e.target.value)}
          value={this.state.address}
          placeholder="Enter Address"
          type="text"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.authReducer
  };
}

export default connect(mapStateToProps, { getUser })(Dashboard);
