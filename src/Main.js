import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Provider, DefaultTheme } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Navigator from './Navigator'
import Color from './Assets/Color'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Color.Primary,
        accent: Color.Accent
    }
}

const settings = {
    icon: props => <Ionicons {...props} />
}

export default () => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <Provider theme={theme} settings={settings}>
            <Navigator />
        </Provider>
    )
}
