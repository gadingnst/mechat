import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button, Avatar } from 'react-native-paper'
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-root-toast'
import RNFetchBlob from 'rn-fetch-blob'
import Firebase from '../../Config/FirebaseSDK'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'
import { updateUser } from '../../Redux/Actions/Auth'

const {
    fs,
    polyfill: { Blob, XMLHttpRequest }
} = RNFetchBlob

window.XMLHttpRequest = XMLHttpRequest
window.Blob = Blob

export default ({ navigation }) => {
    const user = navigation.getParam('user')
    const dispatch = useDispatch()
    const [name, setName] = useState(user.name || '')
    const [number, setNumber] = useState(user.number || '')
    const [bio, setBio] = useState(user.biodata || '')
    const [avatar, setAvatar] = useState(null)
    const [loading, showLoading] = useState(false)

    const imagePicker = () => {
        showLoading(true)
        const opts = {
            title: 'Select Avatar',
            mediaType: 'photo',
            maxWidth: 450,
            maxHeight: 450,
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
                    animation: true
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
                setAvatar(res)
                return showLoading(false)
            }
            setAvatar(avatar)
            showLoading(false)
        })
    }

    const updateProfile = async () => {
        showLoading(true)
        const db = Firebase.database()
        const updates = {}

        if (name.length > 0) {
            const data = {
                name,
                number: number.length > 0 ? number : null,
                biodata: bio.length > 0 ? bio : null,
                avatar: `https://ui-avatars.com/api/?size=256&name=${name
                    .trim()
                    .replace(/\s+/, '+')}`
            }

            try {
                if (avatar) {
                    const imageRef = Firebase.storage()
                        .ref('/avatars')
                        .child(user.id)

                    const mime = 'application/octet-stream'

                    let blob = await fs.readFile(avatar.uri, 'base64')
                    blob = await Blob.build(blob, { type: `${mime};BASE64` })
                    await imageRef.put(blob, { contentType: mime })
                    data.avatar = await imageRef.getDownloadURL()
                    blob.close()
                }

                const snapshot = (await db.ref('/contacts').once('value')).val()

                const usersSnapshots = Object.keys(snapshot).map(contactsId => {
                    if (contactsId !== user.id) {
                        if (snapshot[contactsId].hasOwnProperty(user.id)) {
                            return `/contacts/${contactsId}/${user.id}`
                        }
                    }
                    return false
                })

                usersSnapshots
                    .filter(item => item)
                    .forEach(item => {
                        updates[`${item}/name`] = data.name
                        updates[`${item}/biodata`] = data.biodata
                        updates[`${item}/number`] = data.number
                        updates[`${item}/avatar`] = data.avatar
                    })

                updates[`/users/${user.id}/name`] = data.name
                updates[`/users/${user.id}/biodata`] = data.biodata
                updates[`/users/${user.id}/number`] = data.number
                updates[`/users/${user.id}/avatar`] = data.avatar

                await db.ref().update(updates)
                dispatch(updateUser(data))

                Toast.show('Success updating profile.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    animation: true
                })
                navigation.goBack()
            } catch (err) {
                console.log(err)
            }
        } else {
            Toast.show('Name must not be empty.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                animation: true,
                backgroundColor: Color.Danger
            })
        }
        showLoading(false)
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
                        loading={loading}
                        disabled={loading}
                        onPress={updateProfile}
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
