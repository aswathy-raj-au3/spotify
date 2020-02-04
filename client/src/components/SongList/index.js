import React, { Component } from "react";
//import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from "../../redux/actions/songActions";
import "../SongList/SongList.css";

class SongList extends Component {
  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  renderSongs() {
    return this.props.songs.map((song, i) => {
      return (
        <li className="user-song-item" key={i}>
          {this.props.viewType == "search" && (
            <p className="add-song">
              <i className="fa fa-plus" aria-hidden="true" />
            </p>
          )}

          <div className="song-title">
            <p>{song.track.name}</p>
          </div>

          <div className="song-artist">
            <p>{song.track.artists[0].name}</p>
          </div>

          <div className="song-album">
            <p>{song.track.album.name}</p>
          </div>

          <div className="song-added">
            <p>{song.track.album.release_date}</p>
            {/* <p>{moment(song.added_at).format("YYYY-MM-DD")}</p> */}
          </div>

          <div className="song-length">
            <p>{this.msToMinutesAndSeconds(song.track.duration_ms)}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    console.log("View Type:", this.props.viewType);
    return (
      <div>
        <div className="song-header-container">
          <div className="song-title-header">
            <p>Title</p>
          </div>
          <div className="song-artist-header">
            <p>Artist</p>
          </div>
          <div className="song-album-header">
            <p>Album</p>
          </div>
          <div className="song-added-header">
            <i className="fa fa-calendar-plus-o" aria-hidden="true" />
          </div>
          <div className="song-length-header">
            <p>
              <i className="fa fa-clock-o" aria-hidden="true" />
            </p>
          </div>
        </div>
        {this.props.searchSongs &&
          !this.props.searchSongsPending &&
          !this.props.searchSongsError &&
          this.renderSongs()}
      </div>
    );
  }
}

SongList.propTypes = {
  viewType: PropTypes.string,
  // token: PropTypes.string,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  searchSongsError: PropTypes.bool,
  searchSongsPending: PropTypes.bool,
  searchSongs: PropTypes.func
};

const mapStateToProps = state => {
  return {
    // token: state.tokenReducer.token ? state.tokenReducer.token : "",
    songs: state.songsReducer.songs ? state.songsReducer.songs : "",
    searchSongsError: state.songsReducer.searchSongsError,
    searchSongsPending: state.songsReducer.searchSongsPending,
    viewType: state.songsReducer.viewType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
