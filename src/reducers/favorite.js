import {
    ADD_FAVLIST_SUCCESS,
    REMOVE_FAVLIST_SUCCESS,
    ERROR,
    DOWNLOADABLE_PATH_SUCCESS,
} from '@actions/favorite'

const initialState = {
    favlist: [],
    favlistDownloadable: [],
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVLIST_SUCCESS:
            return {
                ...state,
                favlist: action.payload.newFavlist,
                favlistDownloadable: [],
                error: '',
            }
        case REMOVE_FAVLIST_SUCCESS:
            return {
                ...state,
                favlist: action.payload.newFavlist,
                favlistDownloadable: [],
                error: '',
            }
        case DOWNLOADABLE_PATH_SUCCESS:
            return {
                ...state,
                favlistDownloadable: action.payload.list,
                error: '',
            }
        case ERROR:
            return {
                ...state,
                error: action.payload.error,
            }
        default:
            return state
    }
}
