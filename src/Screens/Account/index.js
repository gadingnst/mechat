import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Avatar } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'
import { logout } from '../../Redux/Actions/Auth'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const auth = useSelector(({ auth }) => auth)
    const onLogout = () => {
        dispatch(logout())
            .then(() => {
                Toast.show('Logged Out.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    backgroundColor: Color.Danger
                })
                navigation.navigate('AppLoadingIndicator')
            })
            .catch(err => {
                const message =
                    err.message === 'Network Error'
                        ? "Can't established your network."
                        : `Logout Failed, ${err.message}.`

                Toast.show(message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: Color.Danger,
                    shadow: true,
                    animation: true
                })
            })
    }

    return (
        <>
            <Header title="My Account" backgroundColor={Color.Info} />
            <View style={styles.container}>
                <Avatar.Image source={{ uri: auth.user.avatar }} />
                <Text>{JSON.stringify(auth.user)}</Text>
                <Button
                    icon="ios-backspace"
                    color={Color.Danger}
                    mode="contained"
                    loading={auth.loading}
                    disabled={auth.loading}
                    onPress={onLogout}
                >
                    LOGOUT
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})