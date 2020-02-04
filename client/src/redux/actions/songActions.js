import uniqBy from "lodash/uniqBy";
import { setArtistIds } from "./artistActions";

export const updateViewType = view => {
  return {
    type: "UPDATE_VIEW_TYPE",
    view
  };
};

export const fetchSongsPending = () => {
  return {
    type: "FETCH_SONGS_PENDING"
  };
};

export const fetchSongsSuccess = songs => {
  return {
    type: "FETCH_SONGS_SUCCESS",
    songs
  };
};

export const fetchSongsError = () => {
  return {
    type: "FETCH_SONGS_ERROR"
  };
};

export const fetchSongs = accessToken => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/me/tracks?limit=50`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken
        })
      }
    );

    dispatch(fetchSongsPending());

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        // get all artist ids and remove duplicates
        let artistIds = uniqBy(res.items, item => {
          return item.track.artists[0].name;
        })
          .map(item => {
            return item.track.artists[0].id;
          })
          .join(",");

        dispatch(setArtistIds(artistIds));

        dispatch(fetchSongsSuccess(res.items));
      })
      .catch(err => {
        dispatch(fetchSongsError(err));
      });
  };
};

export const searchSongsSuccess = (songs) => {
  return {
      type: 'SEARCH_SONGS_SUCCESS',
      songs
  };
};

export const searchSongsPending = () => {
  return {
    type: 'SEARCH_SONGS_PENDING'
  };
};

export const searchSongsError = () => {
  return {
      type: 'SEARCH_SONGS_ERROR'
  };
};
export const searchSongs = (searchTerm, accessToken) => {
  return dispatch => {
   const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      headers: new Headers({
          'Authorization': 'Bearer ' + accessToken,
          'Accept': 'application/json'
  })
  })

  fetch(request)
   .then(res => {
      if(res.statusText === "Unauthorized") {
          window.location.href = './';
      }
      return res.json()
   })
   .then(res => {
      console.log(res.tracks.items)
      res.items = res.tracks.items.map(item => {
          
        return {
          track: item
        };
      });
      dispatch(searchSongsSuccess(res.items));
    })
    .catch(err => {
      dispatch(searchSongsError(err));
   });
}
  
};
