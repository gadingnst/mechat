import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'
import Http from 'axios'
import { NOTIFICATIONS_API_BASEURL } from 'react-native-dotenv'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'
import Firebase from '../../Config/FirebaseSDK'

export default ({ navigation }) => {
    const user = navigation.getParam('user')
    const currentUser = useSelector(({ auth }) => auth.user)
    const [msg, setMsg] = useState([])

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
        senderRef.on('child_added', snapshot => {
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
                messages={msg}
                onSend={onSendChat}
                user={{
                    _id: currentUser.id,
                    name: currentUser.name,
                    avatar: currentUser.avatar
                }}
            />
        </>
    )
}
