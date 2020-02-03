import React, { useContext, useCallback } from 'react';
import useLocation from '../../hooks/useLocation';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import TrackMap from '../../components/TrackMap';
import TrackForm from '../../components/TrackForm';
import { Context as LocationContext } from '../../context/locationContext';
import { FontAwesome } from '@expo/vector-icons';
// import '../../mockLocation';

const TrackCreateScreen = ({ isFocused }) => {
    const {
        state: { isRecording },
        addLocation
    } = useContext(LocationContext);

    const callback = useCallback(
        location => addLocation(location, isRecording),
        [isRecording]
    );

    const [error] = useLocation(isFocused || isRecording, callback);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>This is track create screen</Text>
            <TrackMap />
            {error ? <Text>{error}</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = () => {
    return {
        title: 'Add new Track',
        tabBarIcon: <FontAwesome name='plus' size={20} />
    };
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
