import axios from 'axios'
import { API_BASE, API_BASE_DEV, NODE_ENV } from '@env'


const dev = NODE_ENV === 'dev'

const api = axios.create({
    baseURL: dev ? API_BASE_DEV : API_BASE,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default api
