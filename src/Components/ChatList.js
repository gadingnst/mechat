import React from 'react'
import { Text, View } from 'react-native'
import { List, Avatar, Badge } from 'react-native-paper'
import Color from '../Assets/Color'

export default ({ user, navigate = () => false, chats = [] }) => {
    return (
        <>
            <List.Item
                description={chats[chats.length - 1].text}
                onPress={() => navigate()}
                title={<Text style={{ fontWeight: 'bold' }}>{user.name}</Text>}
                right={props => (
                    <>
                        <List.Icon
                            style={{ alignSelf: 'center' }}
                            icon="ios-chatboxes"
                        />
                    </>
                )}
                left={props => (
                    <>
                        <Avatar.Image
                            size={55}
                            style={{ alignSelf: 'center' }}
                            source={{
                                uri: user.avatar
                            }}
                        />
                        <Badge
                            size={18}
                            style={{
                                marginLeft: -15,
                                backgroundColor: user.status
                                    ? Color.Success
                                    : Color.Danger
                            }}
                        />
                    </>
                )}
            />
            <View
                style={{
                    width: '85%',
                    height: 2.5,
                    backgroundColor: '#ccc',
                    alignSelf: 'center',
                    marginVertical: 5
                }}
            />
        </>
    )
}
