import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    StyleSheet,
    Linking,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import { Avatar, Card, List, Button } from 'react-native-paper'
import { NavigationEvents } from 'react-navigation'
import Parallax from 'react-native-parallax-scroll-view'
import ImageView from 'react-native-image-view'
import Toast from 'react-native-root-toast'
import { ConfirmDialog } from 'react-native-simple-dialogs'
import Firebase from '../../Config/FirebaseSDK'
import Header from '../../Components/Header'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const user = navigation.getParam('user')
    const authUser = useSelector(({ auth }) => auth.user)
    const [headerShouldVisible, setHeaderShouldVisible] = useState(false)
    const [modal, showModal] = useState(false)
    const [isInContact, setIsInContact] = useState(false)
    const [loading, showLoading] = useState(true)
    const [confirm, showConfirm] = useState(false)
    const images = [{ title: user.name, source: { uri: user.avatar } }]

    const onFocus = () => {
        Firebase.database()
            .ref(`/contacts/${authUser.id}`)
            .once('value')
            .then(snapshot => {
                let result = snapshot.val()
                if (result.hasOwnProperty(user.id)) {
                    setIsInContact(true)
                } else {
                    setIsInContact(false)
                }
                showLoading(false)
            })
    }

    const addContact = () => {
        showLoading(true)
        Firebase.database()
            .ref(`/contacts/${authUser.id}/${user.id}`)
            .set({ ...user })
            .then(() => {
                showLoading(false)
                Toast.show(`${user.name} added to your contact.`, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    animation: true
                })
                navigation.navigate('Contacts', { contactUpdated: true })
            })
    }

    const removeContact = () => {
        showConfirm(false)
        showLoading(true)
        Firebase.database()
            .ref(`/contacts/${authUser.id}/${user.id}`)
            .set(null)
            .then(() => {
                showLoading(false)
                Toast.show(`${user.name} removed from your contact.`, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: Color.Danger,
                    animation: true
                })
                navigation.navigate('Contacts', { contactUpdated: true })
            })
    }

    return (
        <>
            <NavigationEvents onDidFocus={onFocus} />
            <ConfirmDialog
                title="Remove Contact"
                message="Are you sure want to remove this user from your contacts?"
                visible={confirm}
                onTouchOutside={() => showConfirm(false)}
                positiveButton={{
                    title: 'Remove Contact',
                    onPress: removeContact
                }}
                negativeButton={{
                    title: 'Cancel',
                    onPress: () => showConfirm(false)
                }}
            />
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
                                disabled={loading || !isInContact}
                                loading={loading}
                                onPress={() =>
                                    navigation.navigate('ChatRoom', { user })
                                }
                            >
                                Chat
                            </Button>
                            <Button
                                dark
                                style={{ marginHorizontal: 5 }}
                                loading={loading}
                                disabled={loading}
                                mode="outlined"
                                icon={
                                    isInContact
                                        ? 'ios-close-circle'
                                        : 'ios-add-circle'
                                }
                                color={
                                    isInContact ? Color.Danger : Color.Accent
                                }
                                onPress={() =>
                                    isInContact
                                        ? showConfirm(true)
                                        : addContact()
                                }
                            >
                                {loading
                                    ? 'Loading'
                                    : isInContact
                                    ? 'Delete Contact'
                                    : 'Add Contact'}{' '}
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
