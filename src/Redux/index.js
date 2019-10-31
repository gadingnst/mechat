import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducers from './Reducers'

const config = {
    key: 'root',
    storage: AsyncStorage
}

const reducers = persistReducer(config, rootReducers)
const store = createStore(reducers, applyMiddleware(promiseMiddleware))
const persistor = persistStore(store)

export default () => ({ store, persistor })
