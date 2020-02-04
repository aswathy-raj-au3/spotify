const defaultState = {
  fetchArtistSongsPending: true,
  //fetchSongsPending: true,
  songPlaying: false,
  //timeElapsed: 0,
  songId: 0,
  viewType: "songs",
  songPaused: true
};

export const songsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_VIEW_TYPE":
      return {
        ...state,
        viewType: action.view
      };

    case "FETCH_ARTIST_SONGS_PENDING":
      return {
        ...state,
        fetchArtistSongsPending: true
      };

    case "FETCH_ARTIST_SONGS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: "Artist",
        fetchArtistSongsError: false,
        fetchArtistSongsPending: false
      };

    case "FETCH_ARTIST_SONGS_ERROR":
      return {
        ...state,
        fetchArtistSongsError: true,
        fetchArtistSongsPending: false
      };

    case 'SEARCH_SONGS_SUCCESS':
          return{
              ...state, viewType:'search', searchSongsError:false, songs: action.songs
          }

    case 'SEARCH_SONGS_ERROR':
        return{
            ...state, searchSongsError: true
        }
    case "SEARCH_SONGS_PENDING":
      return {
        ...state,
        searchSongsPending: true
      };
    
    case "PLAY_SONG":
      return {
        ...state,
        songPlaying: true,
        songDetails: action.song,
        songId: action.song.id,
        songPaused: false
      };
  
    case "STOP_SONG":
      return {
        ...state,
        songPlaying: false,
        songDetails: null,
        songPaused: true
      };
  
    case "PAUSE_SONG":
      return {
        ...state,
        songPaused: true
      };
  
    case "RESUME_SONG":
      return {
        ...state,
        songPaused: false
      };

    default:
      return state;
  }
};

export default songsReducer;
