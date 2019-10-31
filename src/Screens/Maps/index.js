import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import Color from '../../Assets/Color'
import Header from '../../Components/Header'
import Firebase from '../../Config/FirebaseSDK'

const ASPECT_RATIO =
    Dimensions.get('window').width / Dimensions.get('window').height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default () => {
    const db = Firebase.database()
    const user = useSelector(({ auth }) => auth.user)
    const [region, setRegion] = useState({
        latitude: -6.117664,
        longitude: 106.906349,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    })

    const geoConfig = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
    }

    const handleGeo = {
        success: async position => {
            const updates = {}
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            setRegion({ ...region, ...location })

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
        },
        error: error => {
            console.log(error)
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            handleGeo.success,
            handleGeo.error,
            geoConfig
        )
        const geoWatchId = Geolocation.watchPosition(
            handleGeo.success,
            handleGeo.error,
            geoConfig
        )
        return () => {
            Geolocation.clearWatch(geoWatchId)
        }
    }, [])

    return (
        <>
            <Header title="Maps" backgroundColor={Color.Success} />
            <View>
                <Text>{JSON.stringify(region)}</Text>
            </View>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapView}
                    region={region}

                    showsUserLocation
                >
                    <MapView.Marker
                        title="You"
                        coordinate={region}
                        key={user.id}
                    />
                </MapView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mapView: {
        ...StyleSheet.absoluteFillObject
    },
    container: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})
