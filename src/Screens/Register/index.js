import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Card, TextInput, Button, Title, HelperText } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import Color from '../../Assets/Color'
import Firebase from '../../Config/FirebaseSDK'

export default ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, showLoading] = useState(false)
    const [error, setError] = useState('')

    const handleRegister = () => {
        showLoading(true)
        const data = {
            name: name.trim(),
            email: email.trim(),
            password
        }
        if (data.name.length > 0) {
            Firebase.auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(user => {
                    setError('')
                    setName('')
                    setEmail('')
                    setPassword('')
                    console.log(user)
                    Toast.show('Success Register!', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true
                    })
                })
                .catch(err => setError(err.message))
                .finally(() => showLoading(false))
        } else {
            setError('The name cannot be empty.')
            showLoading(false)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Card style={styles.loginCard}>
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
