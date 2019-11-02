import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, ScrollView } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { NavigationEvents } from 'react-navigation'
import Header from '../../Components/Header'
import UserList from '../../Components/UserList'
import Color from '../../Assets/Color'
import Firebase from '../../Config/FirebaseSDK'

const Contacts = ({ contacts, navigate = () => false }) => {
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
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text>No Contacts Available</Text>
            </View>
        )
    }
}

export default ({ navigation }) => {
    const { user } = useSelector(state => state.auth)
    const [searchQuery, setSearchQuery] = useState('')
    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState(false)

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
        Firebase.database()
            .ref(`/contacts/${user.id}`)
            .on('value', snapshot => {
                const data = snapshot.val()
                setContacts(
                    Object.keys(data || {}).map(id => ({
                        id,
                        ...data[id]
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
            <ScrollView>
                <View style={{ padding: 5 }}>
                    <Contacts
                        contacts={filteredContacts || contacts}
                        navigate={navigation.navigate}
                    />
                </View>
            </ScrollView>
        </>
    )
}
