import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'

export default () => {
    return (
        <>
            <Header title="Contacts" backgroundColor={Color.Accent} />
            <View style={styles.container}>
                <Text>Hello from FriendList</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
