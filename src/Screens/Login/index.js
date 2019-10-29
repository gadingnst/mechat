import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Card, TextInput, Button, Title } from 'react-native-paper'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <View style={styles.container}>
                <Card style={styles.loginCard}>
                    <Card.Cover
                        style={{ width: 125, height: 125, alignSelf: 'center' }}
                        source={require('../../Assets/Images/AppIconSplash/icon.jpg')}
                    />
                    <Card.Content>
                        <Title style={{ alignSelf: 'center' }}>Login</Title>
                        <View style={styles.horizontlLine} />
                        <TextInput
                            label="Email"
                            mode="outlined"
                            value={email}
                            onChangeText={value => setEmail(value)}
                        />
                        <TextInput
                            label="Password"
                            mode="outlined"
                            value={password}
                            secureTextEntry
                            onChangeText={value => setPassword(value)}
                        />
                        <Button
                            icon="ios-paper-plane"
                            mode="contained"
                            style={styles.btnLogin}
                        >
                            LOGIN
                        </Button>
                        <Text style={styles.text}>OR</Text>
                        <Button icon="logo-google" style={styles.btnGoogle}>
                            SIGN IN WITH GOOGLE
                        </Button>
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
