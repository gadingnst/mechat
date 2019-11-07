import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

export default ({ loading = true, color, size, text }) => {
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={size} color={color} />
                <Text style={{ ...styles.text, color }}>{text}</Text>
            </View>
        )
    }
    return false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15
    }
})
