import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'
import { updateHeaderTitle } from "../../redux/actions/uiActions";
import { fetchAlbumTracks} from '../../redux/actions/albumActions'
import './Albums.css'

const Albums  = (props)  => {

  const renderAlbums = () => {
     return props.albums ? props.albums.map((item, index) => {
      const albumTracks = (token,  item) => {
        props.fetchAlbumTracks(token, item.album.id);
        props.updateHeaderTitle(item.album.name);
      };
    return (
              <li className="album-item" key={index}>
          
                  <div  key={index} onClick={() => {albumTracks(props.token, item)}}>
                    <div className="album-image">
                    <img src={item.album.images[0].url} alt="album"></img>
                    </div>

                    <div className="album-details">
                    <p className="album-name">{item.album.name}</p>
                    <p className="artist-name">{item.album.artists[0].name}</p>
                    </div>
                  </div>
              </li>
    )
     }): ""
    }
     return(
      <ul className="albums-container" > {props.albums && renderAlbums()}</ul>
     )
    
}

Albums.propTypes = {
  token: PropTypes.string,
  albums: PropTypes.array,
  updateHeaderTitle: PropTypes.func,
  fetchAlbumTracks: PropTypes.func
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token,
    albums: state.albumsReducer.albums
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAlbumTracks,
      updateHeaderTitle
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);