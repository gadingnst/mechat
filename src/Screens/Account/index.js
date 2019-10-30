import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button, Avatar, Card, List } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import Parallax from 'react-native-parallax-scroll-view'
import ImageView from 'react-native-image-view'
import { ConfirmDialog } from 'react-native-simple-dialogs'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'
import { logout } from '../../Redux/Actions/Auth'

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading, user } = useSelector(({ auth }) => auth)
    const [headerShouldVisible, setHeaderShouldVisible] = useState(false)
    const [modal, showModal] = useState(false)
    const [confirm, showConfirm] = useState(false)
    const images = [{ title: user.name, source: { uri: user.avatar } }]

    const onLogout = () => {
        showConfirm(false)
        dispatch(logout())
            .then(() => {
                Toast.show('Logged Out.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    backgroundColor: Color.Danger
                })
                navigation.navigate('AppLoadingIndicator')
            })
            .catch(err => {
                const message = err.message.includes('network error')
                    ? "Can't established your network."
                    : `Logout Failed, ${err.message}.`

                Toast.show(message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: Color.Danger,
                    shadow: true,
                    animation: true
                })
            })
    }

    return (
        <>
            <ImageView
                isVisible={modal}
                animationType="fade"
                backgroundColor="rgba(0, 0, 0, .55)"
                images={images}
                onClose={() => showModal(false)}
            />
            <ConfirmDialog
                title="Logout"
                message="Are you sure want to logout?"
                visible={confirm}
                onTouchOutside={() => showConfirm(false)}
                positiveButton={{
                    title: 'Logout',
                    onPress: onLogout
                }}
                negativeButton={{
                    title: 'Cancel',
                    onPress: () => showConfirm(false)
                }}
            />
            <Parallax
                backgroundColor="transparent"
                parallaxHeaderHeight={250}
                backgroundScrollSpeed={2}
                fixedHeaderHeight={60}
                renderFixedHeader={() => (
                    <Header
                        title={headerShouldVisible ? 'My Account' : undefined}
                        elevation={0}
                        backgroundColor={
                            headerShouldVisible ? Color.Info : 'transparent'
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
                                onPress={() => false}
                            />
                            <List.Item
                                title="Email"
                                description={user.email}
                                left={props => (
                                    <List.Icon {...props} icon="ios-mail" />
                                )}
                                onPress={() => false}
                            />
                            <List.Item
                                title="Bio"
                                description={user.biodata || 'No bio.'}
                                left={props => (
                                    <List.Icon {...props} icon="ios-quote" />
                                )}
                                onPress={() => false}
                            />
                            <Button
                                style={styles.btn}
                                icon="ios-create"
                                mode="contained"
                            >
                                Edit Profile
                            </Button>
                            <Button
                                style={{
                                    ...styles.btn,
                                    backgroundColor: Color.Accent
                                }}
                                icon="ios-camera"
                                mode="contained"
                            >
                                Change Avatar
                            </Button>
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                style={{ marginLeft: 8, marginTop: 15 }}
                                color={Color.Danger}
                                icon="ios-exit"
                                mode="contained"
                                loading={loading}
                                disabled={loading}
                                onPress={() => showConfirm(true)}
                            >
                                Logout
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
    },
    btn: {
        marginVertical: 5
    }
})
