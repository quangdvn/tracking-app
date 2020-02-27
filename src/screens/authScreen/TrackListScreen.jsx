import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
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
            {totalTracks.length > 0 ? (
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
            ) : (
                <View style={styles.warn}>
                    <Text style={styles.warnTextHeader}>
                        You are so lazy ...
                    </Text>
                    <Text style={styles.warnTextBody}>
                        Going outside and remember to track your routes
                    </Text>
                </View>
            )}
        </>
    );
};

TrackListScreen.navigationOptions = () => {
    return {
        title: 'Tracks'
    };
};

const styles = StyleSheet.create({
    warn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    warnTextHeader: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    warnTextBody: {
        fontSize: 18
    }
});

export default TrackListScreen;
