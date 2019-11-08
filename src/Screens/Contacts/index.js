import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Searchbar, Button, Subheading } from 'react-native-paper'
import { NavigationEvents } from 'react-navigation'
import Header from '../../Components/Header'
import UserList from '../../Components/UserList'
import Loading from '../../Components/Loading'
import Color from '../../Assets/Color'
import Firebase from '../../Config/FirebaseSDK'

const Contacts = ({ loading, contacts, navigate = () => false }) => {
    contacts = contacts.sort((a, b) =>
        a.chats.length < b.chats.length ? 1 : -1
    )
    if (contacts.length > 0) {
        return contacts.map(item => (
            <UserList
                key={item.id}
                user={item}
                subs={item.email}
                navigate={() => {
                    navigate('UserProfile', {
                        user: item
                    })
                }}
            />
        ))
    } else if (!loading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30
                }}
            >
                <Subheading>No Contacts Available</Subheading>
                <Button
                    dark
                    mode="contained"
                    icon="ios-person"
                    color={Color.Accent}
                    onPress={() => navigate('AddContact')}
                >
                    Add new Contact
                </Button>
            </View>
        )
    }
    return false
}

export default ({ navigation }) => {
    const { user } = useSelector(state => state.auth)
    const [searchQuery, setSearchQuery] = useState('')
    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState(false)
    const [loading, showLoading] = useState(false)

    const onSearchContacts = query => {
        setSearchQuery(query)
        const filtered = contacts.filter(contact =>
            contact.name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredContacts(filtered)
    }

    const onScreenFocus = params => {
        if (params.contactUpdated) {
            getContacts()
        }
        return false
    }

    const getContacts = () => {
        showLoading(true)
        Firebase.database()
            .ref(`/contacts/${user.id}`)
            .on('value', snapshot => {
                showLoading(false)
                const data = snapshot.val()
                setContacts(
                    Object.keys(data || {}).map(id => ({
                        ...data[id],
                        id,
                        chats: data[id].hasOwnProperty('chats')
                            ? Object.keys(data[id].chats)
                            : []
                    }))
                )
            })
    }

    useEffect(() => {
        getContacts()
        return () => {
            Firebase.database()
                .ref(`/contacts/${user.id}`)
                .off('value')
        }
    }, [])

    return (
        <>
            <NavigationEvents
                onDidFocus={({ state }) =>
                    state.params ? onScreenFocus(state.params) : false
                }
            />
            <Header
                title="Contacts"
                backgroundColor={Color.Accent}
                actions={[
                    {
                        icon: 'ios-person-add',
                        onPress: () => {
                            navigation.navigate('AddContact')
                        }
                    }
                ]}
            />
            <View style={{ padding: 10 }}>
                <Searchbar
                    placeholder="Search Contacts"
                    onChangeText={onSearchContacts}
                    value={searchQuery}
                />
            </View>
            <Loading
                loading={loading}
                color={Color.Accent}
                size="large"
                text="Loading contacts..."
            />
            <ScrollView>
                <View style={{ padding: 5 }}>
                    <Contacts
                        loading={loading}
                        contacts={filteredContacts || contacts}
                        navigate={navigation.navigate}
                    />
                </View>
            </ScrollView>
        </>
    )
}
