import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation, { setRNConfiguration } from 'react-native-geolocation-service'
import Color from '../../Assets/Color'
import Header from '../../Components/Header'

const ASPECT_RATIO =
    Dimensions.get('window').width / Dimensions.get('window').height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default () => {
    const [region, setRegion] = useState({
        latitude: -6.117664,
        longitude: 106.906349,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    })

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setRegion({
                    ...region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            error => {
                console.log(error)
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000
            }
        )
    }, [])

    return (
        <>
            <Header title="Maps" backgroundColor={Color.Success} />
            <View>
                <Text>{JSON.stringify(region)}</Text>
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.mapView}
                    region={region}
                    showsUserLocation
                >
                    <MapView.Marker coordinate={region} />
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
