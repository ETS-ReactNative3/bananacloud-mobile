import React from 'react'
import { View, Text, Modal, SafeAreaView, TouchableOpacity } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'

const ModalChoice = ({ visible, onPress, children }) => {
    return (
        <View>
            <Modall animationType="slide" transparent={true} visible={visible}>
                <SafeAreaView
                    style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            position: 'relative',
                            backgroundColor: '#f39c12',
                            padding: 30,
                            borderRadius: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <View style={{ position: 'absolute', top: 5, right: 5 }}>
                            <TouchableOpacity icon="close-outline" onPress={onPress}>
                                <IonIcons name="close-outline" size={28} />
                            </TouchableOpacity>
                        </View>
                        {children}
                    </View>
                </SafeAreaView>
            </Modall>
        </View>
    )
}

const Modall = styled.Modal`
    position: 'absolute';
    top: 0;
    bottom: 0;
`

export default ModalChoice
