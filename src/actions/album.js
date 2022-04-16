import storage from '@react-native-firebase/storage'
import { showMessage } from 'react-native-flash-message'
import RNFS from 'react-native-fs'

export const HYDRATE_SUCCESS = 'HYDRATE_SUCCESS'
export const HYDRATE_FAILED = 'HYDRATE_FAILED'

export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_FAILED = 'CREATE_FAILED'

export const REMOVE_SUCCESS = 'REMOVE_SUCCESS'
export const REMOVE_FAILED = 'REMOVE_FAILED'

export const PHOTOS_ALBUM_SUCCESS = 'PHOTOS_ALBUM_SUCCESS'
export const PHOTOS_ALBUM_FAILED = 'PHOTOS_ALBUM_FAILED'

export const hydrateAlbums = userId => async dispatch => {
    try {
        let albumsList = []

        const albums = await storage().ref(`${userId}/albums`).list()

        for (const key in albums.items) {
            const path = albums.items[key].path.split('.')[0]
            const albumName = path.split('/')[2]

            albumsList.push(albumName)
        }

        dispatch({ type: HYDRATE_SUCCESS, payload: { albumsList } })
    } catch (error) {
        dispatch({ type: HYDRATE_FAILED, payload: { error } })
    }
}

export const createAlbum = (userId, albumName) => async dispatch => {
    try {
        const albumPath = `${RNFS.DocumentDirectoryPath}/${albumName}.json`
        await RNFS.writeFile(albumPath, JSON.stringify([]), 'utf8')

        await storage().ref(`/${userId}/albums/${albumName}.json`).putFile(albumPath)

        await RNFS.unlink(albumPath)

        showMessage({
            message: 'Album créé',
            type: 'info',
        })

        let albumsList = []

        const albums = await storage().ref(`${userId}/albums`).list()

        for (const key in albums.items) {
            const path = albums.items[key].path.split('.')[0]
            const albumName = path.split('/')[2]

            albumsList.push(albumName)
        }

        dispatch({ type: CREATE_SUCCESS, payload: { albumsList } })
    } catch (error) {
        showMessage({
            message: 'error',
            type: 'warning',
        })

        dispatch({ type: CREATE_FAILED, payload: { error } })
    }
}

export const removeAlbum = (userId, name) => async dispatch => {
    storage()
        .ref(`${userId}/albums/${name}.json`)
        .delete()
        .then(async () => {
            showMessage({
                message: 'Album supprimé',
                type: 'info',
            })

            let albumsList = []

            const albums = await storage().ref(`${userId}/albums`).list()

            for (const key in albums.items) {
                const path = albums.items[key].path.split('.')[0]
                const albumName = path.split('/')[2]

                albumsList.push(albumName)
            }

            dispatch({ type: REMOVE_SUCCESS, payload: { albumsList } })
        })
        .catch(error => {
            console.log(error)
            showMessage({
                message: 'error',
                type: 'warning',
            })

            dispatch({ type: REMOVE_FAILED, payload: { error } })
        })
}

export const getPhotosAlbum = albumName => async dispatch => {
    try {
        let photosList = []

        const file = await RNFS.readFile(`${RNFS.DocumentDirectoryPath}/${albumName}_old.json`)
        const fileList = JSON.parse(file)

        for (const key in fileList) {
            const path = await storage().ref(fileList[key].path).getDownloadURL()
            photosList.push({ path: path.toString(), relativePath: fileList[key].path })
        }

        dispatch({ type: PHOTOS_ALBUM_SUCCESS, payload: { photosList } })
    } catch (error) {
        dispatch({ type: PHOTOS_ALBUM_FAILED, payload: { error } })
    }
}
