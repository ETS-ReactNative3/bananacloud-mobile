import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, FlatList, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { uploadFromCamera, uploadFromGallery, uploadImage } from '@utils/upload'
import { getPhotos } from '@utils/photos/getPhotos'

import { Button, Margin } from '@components/styled-components'
import Card from '@components/Card'
import Modal from '@components/Modal'

const Photos = () => {
    const { t } = useTranslation()

    const { width } = Dimensions.get('window')
    const userId = useSelector(state => state.user.user._id)

    const [listPhotos, setListPhotos] = useState([])

    const [modalVisible, setModalVisible] = useState(false)

    hydrateListPhotos = async () => {
        const list = await getPhotos(userId)
        setListPhotos(list)
    }

    useEffect(() => {
        hydrateListPhotos()
    }, [])

    const [uploading, setUploading] = useState(false)

    const handleUploadFromCamera = async () => {
        const photo = await uploadFromCamera()

        if (photo) {
            setUploading(true)
            await uploadImage(photo, userId)
            setUploading(false)
            hydrateListPhotos()
        }
    }

    const handleUploadFromGallery = async () => {
        const photo = await uploadFromGallery()

        if (photo) {
            setUploading(true)
            await uploadImage(photo, userId)
            setUploading(false)
            hydrateListPhotos()
        }
    }

    return (
        <MainView>
            {uploading && (
                <View>
                    <ActivityIndicator size={32} />
                    <Text>{t('photos.uploadLoading')}</Text>
                </View>
            )}
            {listPhotos.length > 0 ? (
                <Margin mt={20}>
                    <FlatList
                        data={listPhotos}
                        numColumns={2}
                        renderItem={item => (
                            <View
                                style={{
                                    width: width / 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <Card photo={item} />
                            </View>
                        )}
                        keyExtractor={item => item.path}
                    />
                </Margin>
            ) : (
                <View>
                    <Text>{t('photos.emptyPhotos')}</Text>
                </View>
            )}
            <UploadButton>
                <Button icon="cloud-upload-outline" onPress={() => setModalVisible(true)} />
            </UploadButton>
            <Modal visible={modalVisible} onPress={() => setModalVisible(false)}>
                <Margin mb={5} mt={5}>
                    <Button
                        title={t('photos.uploadCamera')}
                        icon="camera-outline"
                        onPress={() => handleUploadFromCamera()}
                    />
                </Margin>
                <Margin mb={5} mt={5}>
                    <Button
                        title={t('photos.uploadGallery')}
                        icon="image-outline"
                        onPress={() => handleUploadFromGallery()}
                    />
                </Margin>
            </Modal>
        </MainView>
    )
}

const MainView = styled.View`
    flex: 1;
    position: 'relative';
`

const UploadButton = styled.View`
    position: 'absolute';
    right: 10px;
    bottom: 10px;
`

export default Photos
