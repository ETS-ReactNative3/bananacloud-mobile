import storage from '@react-native-firebase/storage'

export const ADD_FAVLIST_SUCCESS = 'ADD_FAVLIST_SUCCESS'
export const DOWNLOADABLE_PATH_SUCCESS = 'DOWNLOADABLE_PATH_SUCCESS'

export const REMOVE_FAVLIST_SUCCESS = 'REMOVE_FAVLIST_SUCCESS'

export const ERROR = 'ERROR'

export const addOrRemoveToFavlist = (favlist, relativePath) => async dispatch => {
    try {
        let newFavlist = []

        const alreadyFavlisted = favlist.findIndex(el => el.relativePath === relativePath)

        if (alreadyFavlisted !== -1) {
            newFavlist = favlist.filter(el => el.relativePath !== relativePath)
            return dispatch({ type: REMOVE_FAVLIST_SUCCESS, payload: { newFavlist } })
        } else {
            newFavlist = [...favlist, { relativePath }]
            return dispatch({ type: ADD_FAVLIST_SUCCESS, payload: { newFavlist } })
        }
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const getDownloadablePath = favlist => async dispatch => {
    try {
        let list = []
        for (const key in favlist) {
            const path = await storage().ref(favlist[key].relativePath).getDownloadURL()
            list.push({ path: path.toString() })
        }
        dispatch({ type: DOWNLOADABLE_PATH_SUCCESS, payload: { list } })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
