export const fetchAlbumsSuccess = albums => {
    return {
        type: "FETCH_ALBUMS_SUCCESS",
        albums
    };
};

export const fetchAlbumsError = () => {
    return {
        type: "FETCH_ALBUMS_ERROR"
    };
};

export const fetchAlbumsPending = () => {
    return {
        type: "FETCH_ALBUMS_PENDING"
    };
};

export const fetchAlbums = accessToken => {
    return dispatch => {
        const request = new Request(
        `https://api.spotify.com/v1/me/albums`,
        {
            headers: new Headers({
            Authorization: "Bearer " + accessToken
            })
        }
        );
        dispatch(fetchAlbumsPending())

        fetch(request)
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res.items);
            dispatch(fetchAlbumsSuccess(res.items));
        })
        .catch(err => {
            dispatch(fetchAlbumsError(err));
        });
    };
};
