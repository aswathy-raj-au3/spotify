import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "./redux/actions/userActions";
import { setToken } from "./redux/actions/tokenActions";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MainView from "./components/MainView";
import "./App.css";

class App extends Component {
  //static audio;

  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    var state = this.generateRandomString(16);

    if (!hashParams.access_token) {
      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=10aa2b5f5aaa4082b571ff9b7bfef2c8&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback&state=" +
        encodeURIComponent(state);
    } else {
      let expiresIn = this.extract(window.location.href, "expires_in=", "&");
      expiresIn *= expiresIn * 1000;
      console.log(expiresIn);
      window.location.href = window.location.href.replace("3600", expiresIn);
      this.props.setToken(hashParams.access_token);
    }
  }

  generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  extract(string, keyword, limiter) {
    let startIndex = string.indexOf(keyword);
    if (startIndex !== -1) {
      // add the length of the keyword to the start position to get the "real" start
      startIndex += keyword.length;
      let endIndex = string.indexOf(limiter, startIndex);
      if (endIndex !== -1) {
        return string.slice(startIndex, endIndex);
      } else {
        return string.slice(startIndex);
      }
    }
    return undefined;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.fetchUser(nextProps.token);
    }
    // if (this.audio !== undefined) {
    //   this.audio.volume = nextProps.volume / 100;
    // }
  }

  render() {
    return (
      <div className="App">
        <div className="app-container">
          <div className="left-side-section">
            <SideMenu />
          </div>
          <div className="main-section">
            <Header />
            <div className="main-section-container">
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
  fetchUser: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
