import React from 'react'
import { View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper'
import Header from '../../Components/Header'
import ChatList from '../../Components/ChatList'

export default ({ navigation }) => {
    const chats = [
        {
            user: {
                name: 'Sutan Nasution.',
                status: true,
                avatar:
                    'https://sutanlab.id/assets/img/collections/sutan_new.jpeg'
            },
            chats: [{ user: 'Sutan Nasution.', message: 'Hei Bro.' }]
        },
        {
            user: {
                name: 'Rina Mardiana',
                status: false,
                avatar:
                    'https://instagram.fcgk18-1.fna.fbcdn.net/vp/3152008e1601f9e370d7935206cb5619/5E577E44/t51.2885-15/e35/s1080x1080/65922090_2367583833323057_3899391724464983981_n.jpg?_nc_ht=instagram.fcgk18-1.fna.fbcdn.net&_nc_cat=105'
            },
            chats: [{ user: 'Rina Mardiana', message: 'Hei Honey' }]
        }
    ]

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
                                navigation.navigate('RoomChat', chat)
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}
