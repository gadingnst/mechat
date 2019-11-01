import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import OneSignal from 'react-native-onesignal'
import { ONESIGNAL_APP_ID } from 'react-native-dotenv'
import Redux from './Redux'
import Main from './Main'

const { store, persistor } = Redux()

export default () => {
    OneSignal.init(ONESIGNAL_APP_ID)

    const onReceived = notification => {
        console.log('Notification received:', notification)
    }

    const onOpened = result => {
        console.log('Message:', result.notification.payload.body)
        console.log('Data:', result.notification.payload.additionalData)
        console.log('isActive:', result.notification.isAppInFocus)
        console.log('openResult:', result)
    }

    const onIds = device => {
        console.log('Device info:', device)
    }

    useEffect(() => {
        OneSignal.addEventListener('received', onReceived)
        OneSignal.addEventListener('opened', onOpened)
        OneSignal.addEventListener('ids', onIds)

        return () => {
            OneSignal.removeEventListener('received', onReceived)
            OneSignal.removeEventListener('opened', onOpened)
            OneSignal.removeEventListener('ids', onIds)
        }
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    )
}
