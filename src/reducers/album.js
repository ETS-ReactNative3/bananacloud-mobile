import {
    HYDRATE_SUCCESS,
    HYDRATE_FAILED,
    CREATE_SUCCESS,
    CREATE_FAILED,
    REMOVE_SUCCESS,
    REMOVE_FAILED,
    PHOTOS_ALBUM_SUCCESS,
    PHOTOS_ALBUM_FAILED,
} from '@actions/album'

const initialState = {
    albumsList: [],
    photosList: [],
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE_SUCCESS:
            return {
                ...state,
                albumsList: action.payload.albumsList,
                error: '',
            }
        case HYDRATE_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        case CREATE_SUCCESS:
            return {
                ...state,
                albumsList: action.payload.albumsList,
                error: '',
            }
        case CREATE_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        case REMOVE_SUCCESS:
            return {
                ...state,
                albumsList: action.payload.albumsList,
                error: '',
            }
        case REMOVE_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        case PHOTOS_ALBUM_SUCCESS:
            return {
                ...state,
                photosList: action.payload.photosList,
                error: '',
            }
        case PHOTOS_ALBUM_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        default:
            return state
    }
}
