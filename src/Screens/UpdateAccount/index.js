import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button, Avatar } from 'react-native-paper'
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-root-toast'
import Firebase from '../../Config/FirebaseSDK'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'
import { updateUser } from '../../Redux/Actions/Auth'

export default ({ navigation }) => {
    const user = navigation.getParam('user')
    const [name, setName] = useState(user.name || '')
    const [number, setNumber] = useState(user.number || '')
    const [bio, setBio] = useState(user.bio || '')
    const [avatar, setAvatar] = useState(null)
    const [loading, showLoading] = useState(false)

    const imagePicker = () => {
        showLoading(true)
        const opts = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(opts, res => {
            if (res.didCancel) {
                Toast.show('Canceled.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    animation: true,
                    backgroundColor: Color.Danger
                })
            } else if (res.error) {
                Toast.show(
                    `An error occured during selecting image: ${res.error}`,
                    {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        animation: true,
                        backgroundColor: Color.Danger
                    }
                )
            } else {
                setAvatar({
                    uri: res.uri,
                    type: res.type,
                    name: res.fileName
                })
                return showLoading(false)
            }
            setAvatar(avatar)
            showLoading(false)
        })
    }

    useEffect(() => {
        return () => {
            setAvatar(null)
        }
    }, [])

    return (
        <>
            <Header
                title="Edit Account"
                backgroundColor={Color.Info}
                back={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{ padding: 15 }}>
                    <TextInput
                        autoFocus
                        label="Name"
                        mode="outlined"
                        style={styles.input}
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                    <TextInput
                        label="Phone Number"
                        mode="outlined"
                        style={styles.input}
                        value={number}
                        onChangeText={value => setNumber(value)}
                    />
                    <TextInput
                        label="Bio"
                        mode="outlined"
                        style={styles.input}
                        value={bio}
                        onChangeText={value => setBio(value)}
                    />
                    <TouchableOpacity onPress={imagePicker}>
                        <Avatar.Image
                            size={150}
                            style={styles.avatarPlaceholder}
                            source={
                                avatar
                                    ? { uri: avatar.uri }
                                    : require('../../Assets/Images/avatar_placeholder.jpg')
                            }
                        />
                        <Avatar.Icon
                            icon="ios-camera"
                            size={35}
                            style={styles.avatarIcon}
                        />
                    </TouchableOpacity>
                    <Button
                        icon="ios-arrow-dropup-circle"
                        mode="outlined"
                        style={{ marginVertical: 10 }}
                        color={Color.Info}
                    >
                        Update Profile
                    </Button>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 5
    },
    avatarPlaceholder: {
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: Color.Info
    },
    avatarIcon: {
        alignSelf: 'center',
        marginLeft: 100,
        marginTop: -60,
        marginBottom: 30,
        backgroundColor: Color.Info
    }
})
