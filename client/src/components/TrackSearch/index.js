import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from "../../redux/actions/songActions";
import SongsList from '../Songs/index'

class TrackSearch extends Component {
  state = {
    searchTerm: ""
  };

  updateSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    var accessToken = 'BQDWE-W4kdUVnnC4F1AA2HGvushmHQGTbJoCGEMHEKRT88C5fKdBcdt4fMXFx4o0k_e5G7p1ykAXzgQnJ8WpXuP_PfTTb9l17bIQj6nPjCatqB1KOISU_tN0NUYtQ5H5x1nzwgz7ba4JPi8J_eKkZpX2sSZ672QZCY-g25vL7asSF5ETOw'
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

        <SongsList/>
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
