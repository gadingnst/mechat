import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'
import { sendChat } from '../../Redux/Actions/Chat'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const user = navigation.getParam('user')
    const { chats } = useSelector(({ chat }) =>
        chat.data.find(({ user: { id } }) => id === user.id)
    )
    const [messages, setMessages] = useState(chats)

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
                messages={messages}
                user={{ _id: 1 }}
                onSend={chat => {
                    setMessages(GiftedChat.append(messages, chat))
                    dispatch(sendChat(chat, user))
                }}
            />
        </>
    )
}
