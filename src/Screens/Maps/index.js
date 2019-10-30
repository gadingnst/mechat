import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Color from '../../Assets/Color'
import Header from '../../Components/Header'

export default () => {
    return (
        <>
            <Header title="Maps" backgroundColor={Color.Success} />
            <View style={styles.container}>
                <Text>Hello from Maps</Text>
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
