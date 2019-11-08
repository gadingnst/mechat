import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Avatar, Subheading, Button } from 'react-native-paper'
import Header from '../../Components/Header'
import UserList from '../../Components/UserList'
import Loading from '../../Components/Loading'
import Firebase from '../../Config/FirebaseSDK'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const { user } = useSelector(state => state.auth)
    const [chats, setChats] = useState([])
    const [loading, showLoading] = useState(false)

    useEffect(() => {
        showLoading(true)
        Firebase.database()
            .ref(`/contacts/${user.id}`)
            .on('value', snapshot => {
                showLoading(false)
                let data = snapshot.val()
                data = Object.keys(data || {}).map(id => {
                    let lastMsg = {}

                    if (data[id].chats) {
                        lastMsg =
                            data[id].chats[
                                Object.keys(data[id].chats)[
                                    Object.keys(data[id].chats).length - 1
                                ]
                            ]
                    }

                    return {
                        lastMsg,
                        user: {
                            id,
                            ...data[id]
                        }
                    }
                })
                setChats(
                    data
                        .filter(item => Object.keys(item.lastMsg).length > 0)
                        .sort((a, b) =>
                            new Date(a.lastMsg.createdAt).getTime() >
                            new Date(b.lastMsg.createdAt).getTime()
                                ? -1
                                : 1
                        )
                )
            })
        return () => {
            Firebase.database()
                .ref(`/contacts/${user.id}`)
                .off('value')
        }
    }, [])

    return (
        <>
            <Header
                title="MeChat"
                left={
                    <Avatar.Image
                        size={40}
                        style={{ marginLeft: 10, marginRight: -10 }}
                        source={require('../../Assets/Images/AppIconSplash/icon.png')}
                    />
                }
            />
            <Loading
                loading={loading}
                color={Color.Primary}
                size="large"
                text="Loading chats..."
            />
            <ScrollView>
                <View style={{ padding: 5 }}>
                    {!chats.length && !loading ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30
                            }}
                        >
                            <Subheading>No Chats Available</Subheading>
                            <Button
                                mode="contained"
                                icon="ios-chatboxes"
                                onPress={() => navigation.navigate('Contacts')}
                            >
                                Start chats from your contacts
                            </Button>
                        </View>
                    ) : (
                        chats.map((item, i) => (
                            <UserList
                                key={item.id || i}
                                user={item.user}
                                navigate={() => {
                                    navigation.navigate('ChatRoom', item)
                                }}
                                subs={item.lastMsg.text}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </>
    )
}
