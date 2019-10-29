import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Color from '../../Assets/Color'

export default () => {
    return (
        <>
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
