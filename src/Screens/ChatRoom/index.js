import React, { useState } from 'react'
import { Avatar } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const [chats, setChats] = useState(navigation.getParam('chats'))
    const user = navigation.getParam('user')

    return (
        <>
            <Header
                title={user.name}
                subtitle={user.status ? 'Online' : 'Offline'}
                backgroundColor={Color.Primary}
                back={() => navigation.goBack()}
                onPress={() => navigation.navigate('UserProfile', { user })}
                left={
                    <Avatar.Image
                        size={45}
                        style={{ marginLeft: 10, marginRight: -10 }}
                        source={{
                            uri: user.avatar
                        }}
                    />
                }
            />
            <GiftedChat
                messages={chats}
                user={{ _id: 1 }}
                onSend={chat => {
                    setChats(GiftedChat.append(chats, chat))
                }}
            />
        </>
    )
}
