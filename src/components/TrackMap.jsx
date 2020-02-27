import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/locationContext';

const TrackMap = () => {
    const {
        state: { currentLocation, locations }
    } = useContext(LocationContext);

    if (!currentLocation) {
        return <ActivityIndicator size='large' style={{ marginTop: 200 }} />;
    }

    return (
        <MapView
            style={styles.mapStyle}
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.0035,
                longitudeDelta: 0.0035
            }}
            region={{
                ...currentLocation.coords,
                latitudeDelta: 0.0035,
                longitudeDelta: 0.0035
            }}
            showsTraffic={true}
            showsBuildings={true}>
            <Circle
                center={currentLocation.coords}
                radius={30}
                strokeColor='rgba(158 , 158 , 255, 1.0)'
                fillColor='rgba(158 , 158 , 255, 0.2)'
                zIndex={-10}
            />
            <Polyline
                coordinates={locations.map(loc => loc.coords)}
                strokeWidth={3}
            />
        </MapView>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        height: 300
    }
});

export default TrackMap;
