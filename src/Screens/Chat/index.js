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
            .once('value', snapshot => {
                let data = snapshot.val()
                data = Object.keys(data || {}).map(id => {
                    const person = {
                        id,
                        name: data[id].name,
                        email: data[id].email,
                        avatar: data[id].avatar,
                        status: data[id].status
                    }
                    return { user: person }
                })
                setChats(data)
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
                    {chats.map((chat, i) => (
                        <ChatList
                            key={i}
                            user={chat.user}
                            subs={chat.user.email}
                            navigate={() => {
                                navigation.navigate('ChatRoom', chat)
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}
