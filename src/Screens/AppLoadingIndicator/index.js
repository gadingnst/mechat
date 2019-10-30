import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const isLoggedIn = useSelector(({ auth }) => auth.loggedIn)
    const reset = routeName =>
        StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })

    useEffect(() => {
        setTimeout(() => {
            if (isLoggedIn) {
                navigation.dispatch(reset('App'))
            } else {
                navigation.dispatch(reset('Auth'))
            }
        }, 1000)
    }, [isLoggedIn, navigation])

    return (
        <>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Color.Accent} />
                <Text style={styles.text}>Please Wait...</Text>
            </View>
        </>
    )
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
        color: Color.Accent,
        marginVertical: 15
    }
})
