import storage from '@react-native-firebase/storage'

export const getAlbums = async userId => {
    let albumsList = []
    const albums = await storage().ref(`${userId}/albums`).list()

    for (const key in albums.items) {
        const path = albums.items[key].path.split('.')[0]
        const albumName = path.split('/')[2]

        albumsList.push(albumName)
    }

    return albumsList
}
