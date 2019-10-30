import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'
import { logout } from '../../Redux/Actions/Auth'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const loading = useSelector(({ auth }) => auth.loading)
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
            <Header title="My Account" backgroundColor={Color.Accent} />
            <View>
                <Text>Hello from account!</Text>
            </View>
            <Button
                icon="ios-backspace"
                color={Color.Danger}
                mode="contained"
                loading={loading}
                disabled={loading}
                onPress={onLogout}
            >
                LOGOUT
            </Button>
        </>
    )
}
