const defaultState = {
    songPlaying: false,
    viewType:'songs',
    songPaused: true
};

export const songsReducer = (state=defaultState, action) => {
    switch(action.type){
        case 'SEARCH_SONGS_SUCCESS':
            return{
                ...state, viewType:'search', searchSongsError:false, songs: action.songs
            }

        case 'SEARCH_SONGS_ERROR':
            return{
                ...state, searchSongsError: true
            }
        default:
         return {state}
    }
}