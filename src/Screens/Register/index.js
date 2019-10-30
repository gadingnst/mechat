import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Card, TextInput, Button, Title, HelperText } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import { register } from '../../Redux/Actions/Auth'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const loading = useSelector(({ auth }) => auth.loading)

    const handleRegister = () => {
        if (name.length > 0) {
            dispatch(register({ name, email, password }))
                .then(() => {
                    setError('')
                    setEmail('')
                    setName('')
                    setPassword('')
                    Toast.show('Success Register.', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        animation: true
                    })
                    navigation.navigate('AppLoadingIndicator')
                })
                .catch(err => setError(err.message))
        } else {
            setError('The name cannot be empty.')
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Card style={styles.registerCard} elevation={0}>
                    <Card.Cover
                        style={{ width: 125, height: 125, alignSelf: 'center' }}
                        source={require('../../Assets/Images/AppIconSplash/icon.jpg')}
                    />
                    <Card.Content>
                        <Title style={{ alignSelf: 'center' }}>
                            Create Account
                        </Title>
                        <View style={styles.horizontlLine} />
                        <TextInput
                            label="Full Name"
                            mode="outlined"
                            value={name}
                            error={error.includes('name')}
                            onChangeText={value => {
                                setError('')
                                setName(value)
                            }}
                        />
                        <HelperText
                            type="error"
                            visible={error.includes('name')}
                        >
                            {error}
                        </HelperText>
                        <TextInput
                            label="Email"
                            mode="outlined"
                            value={email}
                            error={error.includes('email')}
                            onChangeText={value => {
                                setError('')
                                setEmail(value)
                            }}
                        />
                        <HelperText
                            type="error"
                            visible={error.includes('email')}
                        >
                            {error}
                        </HelperText>
                        <TextInput
                            secureTextEntry
                            label="Password"
                            mode="outlined"
                            value={password}
                            error={error.includes('password')}
                            onChangeText={value => {
                                setError('')
                                setPassword(value)
                            }}
                        />
                        <HelperText
                            type="error"
                            visible={error.includes('password')}
                        >
                            {error}
                        </HelperText>
                        <Button
                            dark
                            icon="ios-paper-plane"
                            mode="contained"
                            color={Color.Accent}
                            style={styles.btnLogin}
                            loading={loading}
                            disabled={loading || error.length > 0}
                            onPress={() => handleRegister()}
                        >
                            REGISTER
                        </Button>
                        <TouchableOpacity
                            style={styles.btnRegister}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={{ color: Color.Primary }}>
                                Have an account?
                            </Text>
                            <Text
                                style={{
                                    color: Color.Primary,
                                    alignSelf: 'center'
                                }}
                            >
                                Login Here!
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
        alignItems: 'center'
    },
    registerCard: {
        borderColor: 'transparent',
        borderWidth: 0,
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
