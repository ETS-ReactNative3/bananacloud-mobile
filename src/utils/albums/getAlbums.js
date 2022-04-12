import storage from '@react-native-firebase/storage'

export const getAlbums = async userId => {
    let albumsList = []
    const albums = await storage().ref(`${userId}/albums`).list()
    console.log(albums)

    for (const key in albums.items) {
        const path = albums.items[key].path.split('.')[0]
        const albumName = path.split('/')[2]
        console.log(albumName)

        albumsList.push(albumName)
    }

    return albumsList
}
