import { combineReducers } from 'redux'
import chat from './Chat'
import auth from './Auth'

export default combineReducers({ auth, chat })
