import React from "react";
import PropTypes from "prop-types";
import "./SongsList.css";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

function SongsList(props){
    // var accessToken = 'BQA3ohiUnFtyqLX-Esj6oau8Y6pcG87uMuGS_pKZUtZKqSIoTzBNytExcTI-V7ttk49VuTO_AYrd7aECo7FrE7GM4vOue1I1Mv09TViAzmYtvcPfgq_c89Mt6-lCeCFUiuiIwTd7DYrs31Dj2NDrN7QmsRxCq3fUwuYr8q90x_AmrpSpdQ'

  return(
    
    <div className="songs-container">
      {console.log(props.songs)}
    </div>
  )
}

SongsList.propTypes = {
  accessToken: PropTypes.string
};

const mapStateToProps = state => {
  return {
    songs: state.songsReducer.songs
  };
};

export default connect(mapStateToProps)(SongsList);