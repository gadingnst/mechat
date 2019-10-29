import React from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper'
import Header from '../../Components/Header'
import ChatList from '../../Components/ChatList'

export default ({ navigation }) => {
    const chats = useSelector(({ chat }) => chat.data)

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
                            chats={chat.chats}
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
