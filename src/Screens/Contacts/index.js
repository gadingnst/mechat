import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Header from '../../Components/Header'
import UserList from '../../Components/UserList'
import Color from '../../Assets/Color'
import Firebase from '../../Config/FirebaseSDK'
import { Searchbar } from 'react-native-paper'

const Contacts = ({ contacts, navigate = () => false }) => {
    if (contacts.length > 0) {
        return contacts.map(item => (
            <UserList
                key={item.id}
                user={item}
                navigate={() => {
                    navigate('UserProfile', {
                        user: item
                    })
                }}
                subs={item.email}
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

    useEffect(() => {
        Firebase.database()
            .ref(`/contacts/${user.id}`)
            .on('value', snapshot => {
                const data = snapshot.val()
                setContacts(
                    Object.keys(data || {}).map(id => ({
                        id,
                        name: data[id].name,
                        email: data[id].email,
                        avatar: data[id].avatar,
                        status: data[id].status
                    }))
                )
            })
    }, [])

    return (
        <>
            <Header title="Contacts" backgroundColor={Color.Accent} />
            <View>
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

const styles = StyleSheet.create({
    
})
