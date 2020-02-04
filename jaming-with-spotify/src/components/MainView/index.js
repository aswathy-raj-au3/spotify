import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import SongList from "../SongList";
//import AlbumList from "../AlbumList";
import ArtistList from "../ArtistList";
import SingleArtistTracks from "../SingleArtistTracks";
import Profile from "../Profile";
import BrowseView from "../BrowseView";
import "./MainView.css";

const MainView = ({
  headerTitle,
  viewType,
  audioControl,
  resumeSong,
  pauseSong
}) => {
  return (
    <React.Fragment>
      {headerTitle === "Artists" ? (
        <ArtistList />
      ) : headerTitle === "Get Profile" ? (
        <Profile />
      ) : headerTitle === "Browse" ? (
        <BrowseView />
      ) : viewType === "Artist" ? (
        <SingleArtistTracks />
      ) : (
        "Nothing to display"
      )
      //<SongList/>
      }
      {/* {headerTitle === "Albums" ? (
        <AlbumList audioControl={audioControl} />
      ) : headerTitle === "Artists" ? (
        <ArtistList />
      ) : headerTitle === "Browse" ? (
        <BrowseView />
      ) : (
        //anything else show SongList
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      )} */}
    </React.Fragment>
  );
};

MainView.propTypes = {
  headerTitle: PropTypes.string,
  viewType: PropTypes.string
  //   audioControl: PropTypes.func,
  //   resumeSong: PropTypes.func,
  //   pauseSong: PropTypes.func
};

const mapStateToProps = state => {
  return {
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType
  };
};

export default connect(mapStateToProps)(MainView);
