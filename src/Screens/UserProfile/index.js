import React, { useState } from 'react'
import {
    StyleSheet,
    Linking,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import { Avatar, Card, List, Button } from 'react-native-paper'
import Parallax from 'react-native-parallax-scroll-view'
import ImageView from 'react-native-image-view'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const user = navigation.getParam('user')
    const [headerShouldVisible, setHeaderShouldVisible] = useState(false)
    const [modal, showModal] = useState(false)
    const images = [{ title: user.name, source: { uri: user.avatar } }]

    return (
        <>
            <ImageView
                isVisible={modal}
                animationType="fade"
                backgroundColor="rgba(0, 0, 0, .55)"
                images={images}
                onClose={() => showModal(false)}
            />
            <Parallax
                backgroundColor="transparent"
                parallaxHeaderHeight={250}
                backgroundScrollSpeed={2}
                fixedHeaderHeight={60}
                renderFixedHeader={() => (
                    <Header
                        elevation={0}
                        back={() => navigation.goBack()}
                        title={headerShouldVisible ? user.name : undefined}
                        subtitle={
                            headerShouldVisible
                                ? user.status
                                    ? 'Active'
                                    : 'Inactive'
                                : undefined
                        }
                        backgroundColor={
                            headerShouldVisible ? Color.Primary : 'transparent'
                        }
                        left={
                            !headerShouldVisible || (
                                <Avatar.Image
                                    size={45}
                                    style={{ marginLeft: 10, marginRight: -10 }}
                                    source={{
                                        uri: user.avatar
                                    }}
                                />
                            )
                        }
                    />
                )}
                renderBackground={() => (
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover'
                        }}
                        source={{
                            uri: user.avatar
                        }}
                    />
                )}
                renderForeground={() => (
                    <>
                        <View style={styles.banner}>
                            <TouchableOpacity onPress={() => showModal(true)}>
                                <Avatar.Image
                                    size={125}
                                    source={{ uri: user.avatar }}
                                    style={{ elevation: 10 }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bannerText}>{user.name}</Text>
                            <Text style={styles.bannerSub}>
                                {user.status ? 'Active' : 'Inactive'}
                            </Text>
                        </View>
                    </>
                )}
                scrollEvent={({ nativeEvent }) =>
                    nativeEvent.contentOffset.y < 190
                        ? setHeaderShouldVisible(false)
                        : setHeaderShouldVisible(true)
                }
            >
                <View style={{ padding: 10 }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <List.Item
                                title="Contact Number"
                                description={user.number || 'No phone number.'}
                                left={props => (
                                    <List.Icon {...props} icon="ios-call" />
                                )}
                                onPress={() =>
                                    user.number
                                        ? Linking.openURL(`tel:${user.number}`)
                                        : false
                                }
                            />
                            <List.Item
                                title="Email"
                                description={user.email}
                                left={props => (
                                    <List.Icon {...props} icon="ios-mail" />
                                )}
                                onPress={() =>
                                    user.email
                                        ? Linking.openURL(
                                              `mailto:${user.email}`
                                          )
                                        : false
                                }
                            />
                            <List.Item
                                title="Bio"
                                description={user.biodata || 'No bio.'}
                                left={props => (
                                    <List.Icon {...props} icon="ios-quote" />
                                )}
                                onPress={() => false}
                            />
                            <List.Item
                                title="Location"
                                description={
                                    user.location
                                        ? user.location.address
                                        : 'No location detected.'
                                }
                                left={props => (
                                    <List.Icon {...props} icon="ios-navigate" />
                                )}
                                onPress={() =>
                                    user.location
                                        ? navigation.navigate('Maps', { user })
                                        : false
                                }
                            />
                        </Card.Content>
                        <Card.Actions
                            style={{
                                marginVertical: 10,
                                flexDirection: 'row-reverse'
                            }}
                        >
                            <Button
                                dark
                                style={{ marginHorizontal: 5 }}
                                color={Color.Accent}
                                mode="contained"
                                icon="ios-chatboxes"
                                onPress={() =>
                                    navigation.navigate('ChatRoom', { user })
                                }
                            >
                                Chat
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>
            </Parallax>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        elevation: 5
    },
    banner: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .55)'
    },
    bannerText: {
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 20,
        textShadowOffset: {
            width: -1,
            height: 1
        }
    },
    bannerSub: {
        color: '#fff'
    }
})
