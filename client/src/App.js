import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { fetchUser } from "./redux/actions/userActions";
import { setToken } from "./redux/actions/tokenActions";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MainHeader from "./components/MainHeader";
import MainView from "./components/MainView";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount(){
    console.log(window.location.pathname)

    var access_token = window.location.pathname.split('=')[1].split('&')[0]

    if (access_token)
      this.props.setToken(access_token);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.fetchUser(nextProps.token);
    }
  }

  render() {
    return (
      <div className="App">
      <div className="app-container">
        {/* <button className="add-button btn btn-sm btn-light">Install App &nbsp; <i className="fa fa-arrow-down"></i> </button> */}
        <div className="left-side-section">
          <SideMenu />
        </div>
        <div className="main-section">
          <Header />
          <div className="main-section-container">
            <MainHeader
            //pauseSong={this.pauseSong}
            //resumeSong={this.resumeSong}
            />
            <MainView
            //pauseSong={this.pauseSong}
            //resumeSong={this.resumeSong}
            //audioControl={this.audioControl}
            />
          </div>
        </div>
      </div>
    </div>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUser,
      setToken
    },
    dispatch
  );
  // return {
  //   fetchUser: token => dispatch(fetchUser(token)),
  //   setToken: token => dispatch(setToken(token))
  // };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
