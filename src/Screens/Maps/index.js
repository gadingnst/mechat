import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, Picker, Text, Dimensions } from 'react-native'
import { Card } from 'react-native-paper'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { GOOGLE_MAP_API_KEY } from 'react-native-dotenv'
import axios from 'axios'
import RandomColor from 'randomcolor'
import Firebase from '../../Config/FirebaseSDK'
import Color from '../../Assets/Color'
import Toast from 'react-native-root-toast'

const ASPECT_RATIO =
    Dimensions.get('window').width / Dimensions.get('window').height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const initialRegion = {
    latitude: -6.117664,
    longitude: 106.906349,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
}

export default ({ navigation }) => {
    const db = Firebase.database()
    const user = useSelector(({ auth }) => auth.user)
    const [persons, setPersons] = useState([])
    const [region, setRegion] = useState(initialRegion)
    const [currentLocation, setCurrentLocation] = useState(initialRegion)
    const [selectedFriend, setSelectedFriend] = useState({})

    const geoConfig = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
    }

    const getAddress = (lat, lng) =>
        axios
            .get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`
            )
            .then(({ data }) => data.results[0].formatted_address)

    const handleGeo = {
        success: async (position, callback) => {
            const updates = {}
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                address: await getAddress(
                    position.coords.latitude,
                    position.coords.longitude
                )
            }

            const snapshot = (await db.ref('/contacts').once('value')).val()
            const usersSnapshots = Object.keys(snapshot).map(contactsId => {
                if (contactsId !== user.id) {
                    if (snapshot[contactsId].hasOwnProperty(user.id)) {
                        return `/contacts/${contactsId}/${user.id}/location`
                    }
                }
                return false
            })

            updates[`/users/${user.id}/location`] = location
            usersSnapshots
                .filter(item => item)
                .forEach(item => {
                    updates[item] = location
                })

            db.ref().update(updates)
            callback({ ...region, ...location })
        },
        error: error => {
            Toast.show(`An error occured. ${error.message}`, {
                backgroundColor: Color.Danger,
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                animation: true
            })
        }
    }

    const onSelectedFriend = val => {
        setSelectedFriend(val)
        if (val.location) {
            setRegion({
                ...val.location,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        } else {
            setRegion({
                ...currentLocation,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                handleGeo.success(position, region => {
                    setTimeout(() => {
                        setRegion(region)
                        setCurrentLocation(region)
                    }, 800)
                })
            },
            handleGeo.error,
            geoConfig
        )
        const geoWatchId = Geolocation.watchPosition(
            position => {
                handleGeo.success(position, region => {
                    setCurrentLocation(region)
                })
            },
            handleGeo.error,
            geoConfig
        )
        db.ref(`/contacts/${user.id}`).on('value', snapshot => {
            let data = snapshot.val()
            data = Object.keys(data || {}).map(id => ({
                id,
                ...data[id],
                location:
                    {
                        ...data[id].location,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    } || {}
            }))
            data = data.filter(
                item =>
                    item.location.hasOwnProperty('latitude') &&
                    item.location.hasOwnProperty('longitude')
            )
            setPersons(data)
        })
        return () => {
            Geolocation.clearWatch(geoWatchId)
            db.ref(`/contacts/${user.id}`).off('value')
        }
    }, [])

    return (
        <>
            <View style={{ padding: 10 }}>
                <Card style={{ zIndex: 1 }}>
                    <Card.Content>
                        <View>
                            <Text style={{ marginHorizontal: 8 }}>
                                Select Location:
                            </Text>
                            <Picker
                                selectedValue={selectedFriend}
                                style={{ width: '100%' }}
                                mode="dropdown"
                                onValueChange={onSelectedFriend}
                            >
                                <Picker.Item label="Your Location" value={{}} />
                                {persons.map(item => (
                                    <Picker.Item
                                        key={item.id}
                                        label={item.name}
                                        value={item}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </Card.Content>
                </Card>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    showsUserLocation
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapView}
                    region={region}
                    onRegionChangeComplete={setRegion}
                >
                    <MapView.Marker
                        title="You"
                        coordinate={currentLocation}
                        description={currentLocation.address}
                        key={user.id}
                    />
                    {persons.map(item => (
                        <MapView.Marker
                            key={item.id}
                            title={item.name}
                            description={item.location.address}
                            coordinate={item.location}
                            pinColor={RandomColor({ luminosity: 'bright' })}
                            onCalloutPress={() => {
                                navigation.navigate('UserProfile', {
                                    user: item
                                })
                            }}
                        />
                    ))}
                </MapView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mapView: {
        ...StyleSheet.absoluteFillObject
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})
