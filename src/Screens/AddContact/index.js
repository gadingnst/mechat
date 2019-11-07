import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native'
import {
    TextInput,
    Button,
    Card,
    Avatar,
    Title,
    Subheading
} from 'react-native-paper'
import Toast from 'react-native-root-toast'
import Header from '../../Components/Header'
import Firebase from '../../Config/FirebaseSDK'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const [loading, showLoading] = useState(false)
    const [isInContact, setIsInContact] = useState(false)
    const [userAvailable, setUserAvailable] = useState(true)
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [findUser, setFindUser] = useState({})
    const user = useSelector(({ auth }) => auth.user)

    useEffect(() => {
        Firebase.database()
            .ref('/users')
            .once('value')
            .then(snapshot => {
                const result = snapshot.val()
                setUsers(
                    Object.keys(result || {}).map(id => ({
                        id,
                        ...result[id]
                    }))
                )
            })
        return () => {
            Firebase.database()
                .ref(`/contacts/${user.id}`)
                .off('value')
            Firebase.database()
                .ref('/users')
                .off('value')
        }
    }, [])

    const onFindUser = () => {
        showLoading(true)
        const findUser = users.find(
            ({ email }) => email === search.toLowerCase().trim()
        )
        if (findUser) {
            setUserAvailable(true)
            Firebase.database()
                .ref(`/contacts/${user.id}`)
                .once('value')
                .then(snapshot => {
                    let result = snapshot.val()
                    if (findUser.id !== user.id) {
                        try {
                            if (result.hasOwnProperty(findUser.id)) {
                                setIsInContact(true)
                            } else {
                                setIsInContact(false)
                            }
                        } catch (err) {
                            setIsInContact(false)
                        }
                        setFindUser(findUser)
                    } else {
                        setFindUser({})
                    }
                    showLoading(false)
                })
        } else {
            setFindUser({})
            showLoading(false)
            setUserAvailable(false)
        }
    }

    const addContact = () => {
        Firebase.database()
            .ref(`/contacts/${user.id}/${findUser.id}`)
            .set({ ...findUser })
            .then(() => {
                Toast.show(`${findUser.name} added to your contact.`, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    animation: true
                })
                setFindUser({})
                navigation.navigate('Contacts', { contactUpdated: true })
            })
    }

    return (
        <>
            <Header
                back={() => navigation.goBack()}
                title="Add Contact"
                backgroundColor={Color.Accent}
            />
            <ScrollView>
                <View style={{ padding: 10 }}>
                    <TextInput
                        label="User Email"
                        mode="outlined"
                        value={search}
                        onChangeText={val => setSearch(val)}
                    />
                    <Button
                        icon="ios-search"
                        mode="outlined"
                        loading={loading}
                        style={{ marginVertical: 10 }}
                        color={Color.Accent}
                        onPress={onFindUser}
                    >
                        Find User
                    </Button>
                    {userAvailable || (
                        <Subheading style={{ alignSelf: 'center' }}>
                            User not available.
                        </Subheading>
                    )}
                    {Object.keys(findUser).length < 1 || (
                        <Card elevation={5} style={{ marginVertical: 40 }}>
                            <Card.Content style={{ alignItems: 'center' }}>
                                <Avatar.Image
                                    size={120}
                                    source={{ uri: findUser.avatar }}
                                    style={{ marginTop: -50, elevation: 5 }}
                                />
                                <Title style={{ marginTop: 10 }}>
                                    {findUser.name}
                                </Title>
                                <Subheading>{findUser.email}</Subheading>
                            </Card.Content>
                            <Card.Actions
                                style={{
                                    marginVertical: 10,
                                    flexDirection: 'row-reverse'
                                }}
                            >
                                <Button
                                    style={{
                                        marginHorizontal: 5,
                                        backgroundColor:
                                            isInContact || Color.Accent
                                    }}
                                    mode="contained"
                                    icon="ios-add-circle"
                                    disabled={isInContact}
                                    onPress={addContact}
                                >
                                    Add Contact
                                </Button>
                                <Button
                                    style={{ marginHorizontal: 5 }}
                                    mode="contained"
                                    icon="ios-contact"
                                    onPress={() =>
                                        navigation.navigate('UserProfile', {
                                            user: findUser
                                        })
                                    }
                                >
                                    Profile
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                </View>
            </ScrollView>
        </>
    )
}
