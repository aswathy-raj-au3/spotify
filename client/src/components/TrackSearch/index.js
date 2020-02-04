import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from "../../redux/actions/songActions";
// import SongsList from '../Songs/index'

class TrackSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: ""
    };
  }
  
  updateSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };
 
  render() {
    // console.log(window.location.pathname.split('=')[1].split('&')[0])
    var accessToken = window.location.pathname.split('=')[1].split('&')[0]
    return (
      <div className="track-search-container">
        <form
          onSubmit={() => {
            this.props.searchSongs(this.state.searchTerm, accessToken);
          }}
        >
          <input
            onChange={this.updateSearchTerm}
            type="text"
            placeholder="Search..."
          />
          <button
            onClick={e => {
              e.preventDefault();
              this.props.searchSongs(this.state.searchTerm, accessToken);
            }}
          >
            <i className="fa fa-search search" aria-hidden="true" />
          </button>
        </form>

        {/* <SongsList/> */}
      </div>
    );
  }
}

TrackSearch.propTypes = {
  searchSongs: PropTypes.func,
  token: PropTypes.string
};

// const mapStateToProps = state => {
//   return {
//     token: state.tokenReducer.token
//   };
// };

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchSongs
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(TrackSearch);
