import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from "../../redux/actions/songActions";
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import {updateViewType} from "../../redux/actions/songActions";

const TrackSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("")
  
  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

    var accessToken = props.token
    return (
      <div className="track-search-container">
        <form
          onSubmit={() => {
            props.searchSongs(searchTerm, accessToken);
          }}
        >
          <input
            onChange={updateSearchTerm}
            type="text"
            placeholder="Search..."
          />
          <button
            onClick={e => {
              e.preventDefault();
              props.searchSongs(searchTerm, accessToken);
            }}
          >
            <i className="fa fa-search search" aria-hidden="true" />
          </button>
        </form>

      </div>
    );
  
}

TrackSearch.propTypes = {
  searchSongs: PropTypes.func,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchSongs,
      updateViewType,
      updateHeaderTitle
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);
