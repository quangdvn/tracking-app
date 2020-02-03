import React, { useContext } from 'react';
import {
    Text,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../../context/trackContext';

const TrackListScreen = ({ navigation }) => {
    const {
        state: { totalTracks },
        fetchTracks
    } = useContext(TrackContext);

    return (
        <>
            <NavigationEvents onWillFocus={fetchTracks} />
            <FlatList
                data={totalTracks}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('TrackDetail', {
                                    trackId: item._id
                                })
                            }>
                            <ListItem chevron={true} title={item.name} />
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

TrackListScreen.navigationOptions = () => {
    return {
        title: 'Tracks',
    }
};

const styles = StyleSheet.create({});

export default TrackListScreen;
