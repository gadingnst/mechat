import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper'
import Header from '../../Components/Header'
import ChatList from '../../Components/ChatList'
import Firebase from '../../Config/FirebaseSDK'

export default ({ navigation }) => {
    const { user } = useSelector(state => state.auth)
    const [chats, setChats] = useState([])

    useEffect(() => {
        Firebase.database()
            .ref(`/contacts/${user.id}`)
            .on('value', snapshot => {
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
                            name: data[id].name,
                            email: data[id].email,
                            avatar: data[id].avatar,
                            status: data[id].status
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
            <ScrollView>
                <View style={{ padding: 5 }}>
                    {chats.map(item => (
                        <ChatList
                            key={item.id}
                            user={item.user}
                            navigate={() => {
                                navigation.navigate('ChatRoom', item)
                            }}
                            subs={item.lastMsg.text}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}
