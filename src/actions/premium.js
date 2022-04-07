import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '@utils/api'

import { useSelector } from 'react-redux'

export const PREMIUM_SUCCESS = 'PREMIUM_SUCCESS'
export const PREMIUM_FAILURE = 'PREMIUM_FAILURE'
export const FREE_SUCCESS = 'FREE_SUCCESS'
export const FREE_FAILURE = 'FREE_FAILURE'


export const bePremium = () => async dispatch => {

    const data = await AsyncStorage.getItem("user")
    const user = JSON.parse(data)

    try{
        const { data } = await api.post('update-user', { id : user._id, isPremium : true })
        console.log("SUCCESS")
    } catch (err){
        console.log(err)
    }   

    /*dispatch({ type: PREMIUM_SUCCESS, payload: { success: true } })*/
}

export const beFree = () => async dispatch => {
    dispatch({ type: FREE_SUCCESS, payload: { success: false } })
}
