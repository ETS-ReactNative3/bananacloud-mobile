import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { uploadFromCamera, uploadFromGallery, uploadImage } from '@utils/upload'
import { getPhotos } from '@utils/photos/getPhotos'

import { Button } from '@components/styled-components'
import CardExample from '@components/CardExample'
import HeaderPhoto from '@components/HeaderPhoto'

const Photos = () => {
    const { t } = useTranslation()

    const userId = useSelector(state => state.user.user._id)

    const [listPhotos, setListPhotos] = useState([])

    useEffect(() => {
        hydrateListPhotos = async () => {
            const list = await getPhotos(userId)
            setListPhotos(list)
        }
        hydrateListPhotos()
    }, [])

    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    // const [transferred, setTransferred] = useState(0)

    const handleUploadFromCamera = async () => {
        const photo = await uploadFromCamera()
        setUploading(true)
        await uploadImage(photo, userId)
        setUploading(false)
    }

    const handleUploadFromGallery = async () => {
        const photo = await uploadFromGallery()
        setUploading(true)
        await uploadImage(photo, userId)
        setUploading(false)
    }

    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <Button
                    title={t('photos.uploadCamera')}
                    icon="camera-outline"
                    onPress={() => handleUploadFromCamera()}
                />
                <Button
                    title={t('photos.uploadGallery')}
                    icon="image-outline"
                    onPress={() => handleUploadFromGallery()}
                />
            </View>
            {uploading && (
                <View>
                    <ActivityIndicator size={32} />
                    <Text>{t('photos.uploadLoading')}</Text>
                </View>
            )}
            <FlatList
                data={listPhotos}
                renderItem={item => <CardExample photo={item} />}
                keyExtractor={item => item.path}
            />
        </View>
    )
}

export default Photos
