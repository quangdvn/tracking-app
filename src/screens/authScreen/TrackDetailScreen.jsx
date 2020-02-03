import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as TrackContext } from '../../context/trackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
    const {
        state: { totalTracks }
    } = useContext(TrackContext);

    const trackId = navigation.getParam('trackId');

    const curTrack = totalTracks.find(track => track._id === trackId);

    const trackInitiatalCoords = curTrack.locations[0].coords;

    return (
        <View>
            <Text style={{ fontSize: 50 }}>{curTrack.name}</Text>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    longitudeDelta: 0.0035,
                    latitudeDelta: 0.0035,
                    ...trackInitiatalCoords
                }}>
                <Polyline
                    coordinates={curTrack.locations.map(loc => loc.coords)}
                    strokeWidth={3}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        height: 300
    }
});

export default TrackDetailScreen;
