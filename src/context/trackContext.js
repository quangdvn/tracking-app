import createDataContext from './createDataContext';
import trackerAPI from '../api/trackerAPI';

const initialState = {
    currentTrackName: '',
    totalTracks: []
};

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_TRACK_NAME':
            return { ...state, currentTrackName: action.payload };

        case 'RESET_TRACK_NAME':
            return { ...state, currentTrackName: '' };

        case 'FETCH_TRACKS':
            return { ...state, totalTracks: action.payload };

        default:
            return state;
    }
};

const fetchTracks = dispatch => async () => {
    const {
        data: { tracks }
    } = await trackerAPI.get('/tracks');
    dispatch({ type: 'FETCH_TRACKS', payload: tracks });
};

const createNewTrack = dispatch => async (name, locations) => {
    try {
        await trackerAPI.post('/tracks', { name, locations });
    } catch (err) {
        console.log(err.response.data);
    }
};

const createTrackName = dispatch => trackName => {
    dispatch({ type: 'CREATE_TRACK_NAME', payload: trackName });
};

const resetTrackName = dispatch => () => {
    dispatch({ type: 'RESET_TRACK_NAME' });
};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createNewTrack, createTrackName, resetTrackName },
    initialState
);
