export const searchSongsSuccess = (songs) => {
    return {
        type: 'SEARCH_SONGS_SUCCESS',
        songs
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
  