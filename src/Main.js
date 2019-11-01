import React, { useEffect } from 'react'
import { Provider, DefaultTheme } from 'react-native-paper'
import SplashScreen from 'react-native-splash-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import OneSignal from 'react-native-onesignal'
import { ONESIGNAL_APP_ID } from 'react-native-dotenv'
import Navigator from './Navigator'
import Color from './Assets/Color'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Color.Primary,
        accent: Color.Accent,
        error: Color.Danger
    }
}

const settings = {
    icon: props => <Ionicons {...props} />
}

export default () => {
    OneSignal.init(ONESIGNAL_APP_ID)

    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <Provider theme={theme} settings={settings}>
            <Navigator />
        </Provider>
    )
}
