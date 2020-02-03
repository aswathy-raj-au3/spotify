import React, { Component } from "react";
import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { fetchUser } from "./redux/actions/userActions";
// import { setToken } from "./redux/actions/tokenActions";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-container">
          {/* need to place this btn */}
        <button className="add-button btn btn-sm btn-light">Install App &nbsp; <i className="fa fa-arrow-down"></i> </button>

          <div className="left-side-section">
            <SideMenu />
          </div>
          <div className="main-section">
            <Header />
            This is App Component
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

// const mapStateToProps = state => {
//   return {
//     token: state.tokenReducer.token
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       fetchUser,
//       setToken
//     },
//     dispatch
//   );
//   // return {
//   //   fetchUser: token => dispatch(fetchUser(token)),
//   //   setToken: token => dispatch(setToken(token))
//   // };
// };

export default (App);
