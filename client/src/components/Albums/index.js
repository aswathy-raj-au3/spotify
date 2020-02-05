import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchAlbums} from '../../redux/actions/albumActions'
import './Albums.css'

const Albums  = (props)  => {
    fetchAlbums(props.token)
    return (
      <div >
          <ul className="albums-container">
              <li className="album-item">
                  {console.log(props)}
          
              {props.albums ? props.albums.map((item,index) => {
                 return (
                  <div  key={index} >
                    <div className="album-image">
                    <img src={item.album.images[0].url}></img>
                    <div className="play-song">
                        <i className="fa fa-play-circle-o play-btn" aria-hidden="true"></i>
                    </div>
                    </div>
                    
                    <div className="album-details">
                    <p className="album-name">{item.album.name}</p>
                    <p className="artist-name">{item.album.artists[0].name}</p>
                    </div>
                  </div>
               
               )
             }): "" }

              </li>
          </ul>
       
      </div>
    );
}

Albums.propTypes = {
  token: PropTypes.string,
  albums: PropTypes.array
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token,
    albums: state.albumsReducer.albums
  };
};

export default connect(mapStateToProps)(Albums);