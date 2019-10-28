import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Provider, DefaultTheme } from 'react-native-paper'
import Navigator from './Navigator'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#84bfff',
        accent: '#ff89cb'
    }
}

export default () => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <Provider theme={theme}>
            <Navigator />
        </Provider>
    )
}
