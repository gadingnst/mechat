import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'
import Http from 'axios'
import { NOTIFICATIONS_API_BASEURL } from 'react-native-dotenv'
import Header from '../../Components/Header'
import Loading from '../../Components/Loading'
import Color from '../../Assets/Color'
import Firebase from '../../Config/FirebaseSDK'

const Chat = ({ loading, messages, onSend, user }) => {
    if (loading) {
        return (
            <Loading
                color={Color.Accent}
                size="large"
                text="Loading messages..."
            />
        )
    }
    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
                _id: user.id,
                name: user.name,
                avatar: user.avatar
            }}
        />
    )
}

export default ({ navigation }) => {
    const user = navigation.getParam('user')
    const currentUser = useSelector(({ auth }) => auth.user)
    const [msg, setMsg] = useState([])
    const [loading, showLoading] = useState(false)

    const senderRef = Firebase.database().ref(
        `/contacts/${currentUser.id}/${user.id}/chats`
    )

    const receiverRef = pushChat =>
        Firebase.database().ref(
            `/contacts/${user.id}/${currentUser.id}${
                pushChat === 'chat' ? '/chats' : ''
            }`
        )

    const onSendChat = (chat = []) => {
        chat = chat[0]
        chat = {
            _id: chat._id,
            text: chat.text,
            createdAt: new Date(chat.createdAt).toISOString(),
            user: {
                _id: chat.user._id,
                name: chat.user.name,
                avatar: chat.user.avatar
            }
        }

        const data = {
            sender: {
                name: currentUser.name
            },
            receiver: {
                device: user.deviceId
            },
            text: chat.text
        }

        senderRef.push(chat)
        receiverRef().update({ ...currentUser })
        receiverRef('chat').push(chat)
        Http.post(`${NOTIFICATIONS_API_BASEURL}/notification`, data)
            .then(() => {})
            .catch(() => {})
    }

    useEffect(() => {
        showLoading(true)
        senderRef.on('child_added', snapshot => {
            showLoading(false)
            const chat = snapshot.val()
            setMsg(prevMsg => GiftedChat.append(prevMsg, chat))
        })
        return () => {
            senderRef.off('child_added')
        }
    }, [])

    return (
        <>
            <Header
                title={user.name}
                subtitle={user.status ? 'Active' : 'Inactive'}
                backgroundColor={Color.Accent}
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
            <Chat
                loading={loading}
                messages={msg}
                user={currentUser}
                onSend={onSendChat}
            />
        </>
    )
}
