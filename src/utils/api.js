import axios from 'axios'
import { API_BASE, API_BASE_DEV, NODE_ENV } from '@env'

const dev = NODE_ENV === 'dev'

const api = axios.create({
    baseURL: dev ? API_BASE_DEV : API_BASE,
})

export default api
