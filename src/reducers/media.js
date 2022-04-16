import {
    UPLOAD_SUCCESS,
    UPLOAD_FAILED,
    ALL_PHOTOS_SUCCESS,
    ALL_PHOTOS_FAILED,
} from '@actions/media'

const initialState = {
    mediaList: [],
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_SUCCESS:
            return {
                ...state,
                error: '',
            }
        case UPLOAD_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        case ALL_PHOTOS_SUCCESS:
            return {
                ...state,
                mediaList: action.payload.mediaList,
                error: '',
            }
        case ALL_PHOTOS_FAILED:
            return {
                ...state,
                mediaList: [],
                error: action.payload.error,
            }
        default:
            return state
    }
}
