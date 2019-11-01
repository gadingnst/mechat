import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Card, TextInput, Button, Title } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import Color from '../../Assets/Color'
import { login, loginWithGoogle } from '../../Redux/Actions/Auth'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const loading = useSelector(({ auth }) => auth.loading)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onLogin = (provider = 'default') => {
        let loginAction

        switch (provider) {
            case 'default':
                loginAction = login
                break
            case 'google':
                loginAction = loginWithGoogle
                break
            default:
                loginAction = login
                break
        }

        dispatch(loginAction({ email, password }))
            .then(() => {
                setEmail('')
                setPassword('')
                setError('')
                Toast.show('Logged In.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    animation: true
                })
                navigation.navigate('AppLoadingIndicator')
            })
            .catch(err => {
                setError(err.message)
                const message =
                    err.message === 'Network Error'
                        ? "Can't established your network."
                        : err.message
                Toast.show(message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: Color.Danger,
                    animation: true
                })
            })
    }

    return (
        <>
            <View style={styles.container}>
                <Card style={styles.loginCard}>
                    <Card.Cover
                        style={{ width: 125, height: 125, alignSelf: 'center' }}
                        source={require('../../Assets/Images/AppIconSplash/logo.jpg')}
                    />
                    <Card.Content>
                        <Title style={{ alignSelf: 'center' }}>Login</Title>
                        <View style={styles.horizontlLine} />
                        <TextInput
                            label="Email"
                            mode="outlined"
                            value={email}
                            error={error.includes('email')}
                            onChangeText={value => setEmail(value)}
                        />
                        <TextInput
                            secureTextEntry
                            label="Password"
                            mode="outlined"
                            value={password}
                            error={error.includes('password')}
                            onChangeText={value => setPassword(value)}
                        />
                        <Button
                            icon="ios-log-in"
                            mode="contained"
                            loading={loading}
                            disabled={loading}
                            style={styles.btnLogin}
                            onPress={onLogin}
                        >
                            LOGIN
                        </Button>
                        {/* <Text style={styles.text}>OR</Text>
                        <Button
                            icon="logo-google"
                            loading={loading}
                            disabled={loading}
                            style={styles.btnGoogle}
                            onPress={() => onLogin('google')}
                        >
                            SIGN IN WITH GOOGLE
                        </Button> */}
                        <TouchableOpacity
                            style={styles.btnRegister}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{ color: Color.Accent }}>
                                Doesn't have an account?
                            </Text>
                            <Text
                                style={{
                                    color: Color.Accent,
                                    alignSelf: 'center'
                                }}
                            >
                                Register Here!
                            </Text>
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    loginCard: {
        borderRadius: 5,
        elevation: 5,
        width: '100%'
    },
    text: {
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center'
    },
    btnLogin: {
        marginTop: 20,
        width: '100%'
    },
    btnRegister: {
        alignSelf: 'center',
        marginTop: 20
    },
    btnGoogle: {
        color: Color.Danger
    },
    horizontlLine: {
        width: '90%',
        height: 2,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        marginTop: 5
    }
})
