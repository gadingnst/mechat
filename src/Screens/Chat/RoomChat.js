import React from 'react'
import { View, Text } from 'react-native'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const chats = navigation.getParam('chats')
    const user = navigation.getParam('user')

    return (
        <>
            <Header
                title={user.name}
                backgroundColor={Color.Primary}
                back={() => navigation.goBack()}
            />
            <View>
                <Text>Hello from room chat!</Text>
            </View>
        </>
    )
}
