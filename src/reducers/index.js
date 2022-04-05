import { combineReducers } from 'redux'

import auth from './auth'
import premium from './premium'
import langage from './langage'

export default combineReducers({ auth, premium, langage })
