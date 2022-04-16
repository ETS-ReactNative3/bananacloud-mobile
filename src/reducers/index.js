import { combineReducers } from 'redux'

import user from './user'
import theme from './theme'
import langage from './langage'
import media from './media'
import album from './album'

export default combineReducers({ user, theme, langage, album, media })
