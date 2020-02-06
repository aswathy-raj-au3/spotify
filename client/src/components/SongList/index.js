import React from "react";
// import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs,fetchRecentlyPlayed,fetchTopTracks } from "../../redux/actions/songActions";
import "../SongList/SongList.css";
//import { addSongToLibrary } from "../../redux/actions/userActions";

const SongList = (props) => {
  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.token !== "" &&
  //     !nextProps.fetchSongsError &&
  //     nextProps.fetchSongsPending &&
  //     nextProps.viewType === "songs"
  //   ) {
  //     this.props.searchSongs(nextProps.token);
  //   }
  // }

 const msToMinutesAndSeconds = (ms) =>{
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

 const renderSongs = () => {
    return props.songs? props.songs.map((song, i) => {
      // const buttonClass =
      // song.track.id === this.props.songId && !this.props.songPaused
      //   ? "fa-pause-circle-o"
      //   : "fa-play-circle-o";

      return (
        <li className="user-song-item"
         //{

          // song.track.id === this.props.songId
          //   ? "active user-song-item"
          //   : "user-song-item"

          //}
           key={i}>

          <div
            onClick={() => {
              // song.track.id === this.props.songId &&
              // this.props.songPlaying &&
              // this.props.songPaused
              //   ? this.props.resumeSong()
              //   : this.props.songPlaying &&
              //     !this.props.songPaused &&
              //     song.track.id === this.props.songId
              //   ? this.props.pauseSong()
              //   : this.props.audioControl(song);
            }}
            className="play-song"
          >
            {/* <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" /> */}
          </div>

          {props.viewType !== "Songs" && (
            <p
              className="add-song"
              onClick={() => {
                //this.props.addSongToLibrary(this.props.token, song.track.id);
              }}
            >
              {props.songAddedId === song.track.id ? (
                
                <i className="fa fa-check add-song" aria-hidden="true" />
              ) : (
                <i className="fa fa-plus add-song" aria-hidden="true" />
              )}
            </p>
          )}

          {props.viewType === "Songs" && (
            <p className="add-song">
              <i className="fa fa-check" aria-hidden="true" />
            </p>
          )}
{/* 
          {this.props.viewType === "search" && (
            <p className="add-song">
              <i className="fa fa-plus" aria-hidden="true" />
            </p>
          )}

          {this.props.viewType === "Top Tracks" && (
            <p className="add-song">
              <i className="fa fa-plus" aria-hidden="true" />
            </p>
          )}

          {this.props.viewType === "Recently Played" && (
            <p className="add-song">
              <i className="fa fa-plus" aria-hidden="true" />
            </p>
          )} */}

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
            <p>{msToMinutesAndSeconds(song.track.duration_ms)}</p>
          </div>
        </li>
      );
    }) : null;
  }

    console.log("View Type:", props.viewType);
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
        {/* {this.props.songs &&
          !this.props.fetchSongsPending &&
          !this.props.fetchPlaylistSongsPending &&
          this.renderSongs()} */}

        {props.searchSongs &&
          !props.searchSongsPending &&
          !props.searchSongsError &&
          renderSongs()}

        {props.fetchRecentlyPlayed &&
          !props.fetchSongsError &&
          !props.fetchSongsPending &&
          renderSongs()}

        {props.fetchTopTracks &&
          !props.fetchTopTracksPending &&
          !props.fetchTopTracksError &&
          renderSongs()}
      </div>
    );
  
}

SongList.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songAddedId: PropTypes.string,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  searchSongsError: PropTypes.bool,
  searchSongsPending: PropTypes.bool,
  searchSongs: PropTypes.func,
  fetchRecentlyPlayed: PropTypes.func,
  fetchTopTracksPending: PropTypes.bool,
  fetchTopTracksError: PropTypes.bool,
  fetchTopTracks: PropTypes.func,
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  // fetchPlaylistSongsPending: PropTypes.bool,
  // fetchSongs: PropTypes.func,
  // audioControl: PropTypes.func,
  // songPaused: PropTypes.bool,
  // songPlaying: PropTypes.bool,
  // resumeSong: PropTypes.func,
  // pauseSong: PropTypes.func,
  // addSongToLibrary: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    songs: state.songsReducer.songs ? state.songsReducer.songs : "",
    searchSongsError: state.songsReducer.searchSongsError,
    searchSongsPending: state.songsReducer.searchSongsPending,
    fetchTopTracksError: state.songsReducer.fetchTopTracksError,
    fetchTopTracksPending: state.songsReducer.fetchTopTracksPending,
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    //fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    //songPlaying: state.songsReducer.songPlaying,
    //songPaused: state.songsReducer.songPaused,
    //songId: state.songsReducer.songId,
    //songAddedId: state.userReducer.songId || "",
    viewType: state.songsReducer.viewType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      
      // fetchSongs,
      fetchRecentlyPlayed,
      fetchTopTracks,
      //addSongToLibrary
      searchSongs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
