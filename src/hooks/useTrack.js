import { useContext } from 'react';
import { Context as TrackContext } from '../context/trackContext';
import { Context as LocationContext } from '../context/locationContext';
import { navigateTo } from '../navigationRef';

export default () => {
    const {
        state: { currentTrackName },
        createNewTrack,
        createTrackName,
        resetTrackName
    } = useContext(TrackContext);

    const {
        state: { locations },
        resetRecording
    } = useContext(LocationContext);

    const saveTrackDetail = async () => {
        await createNewTrack(currentTrackName, locations);
        resetRecording();
        resetTrackName();

        navigateTo('TrackList');
    };

    const saveTrackName = newName => {
        createTrackName(newName);
    };

    return [saveTrackDetail, saveTrackName, currentTrackName];
};
