import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { View, Text } from 'react-native'

export default () => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Hello from MeChat!</Text>
        </View>
    )
}
