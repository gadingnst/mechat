import React from 'react'
import { View, Text } from 'react-native'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'

export default () => {
    return (
        <>
            <Header title="My Account" backgroundColor={Color.Accent} />
            <View>
                <Text>Hello from account!</Text>
            </View>
        </>
    )
}
