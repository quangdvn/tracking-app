import createDataContext from './createDataContext';

const initialState = {
    isRecording: false,
    locations: [],
    currentLocation: null
};

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CURRENT_LOCATION':
            return { ...state, currentLocation: action.payload };

        case 'ADD_TO_LOCATIONS':
            return {
                ...state,
                locations: [...state.locations, action.payload]
            };

        case 'START_RECORDING':
            return { ...state, isRecording: true };

        case 'STOP_RECORDING':
            return { ...state, isRecording: false };

        case 'RESET_RECORDING':
            return { ...state, locations: [] };

        default:
            return state;
    }
};

const startRecording = dispatch => () => {
    dispatch({ type: 'START_RECORDING' });
};

const stopRecording = dispatch => () => {
    dispatch({ type: 'STOP_RECORDING' });
};

const resetRecording = dispatch => () => {
    dispatch({ type: 'RESET_RECORDING' });
};

const addLocation = dispatch => (location, isRecording) => {
    dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
    if (isRecording) {
        dispatch({ type: 'ADD_TO_LOCATIONS', payload: location });
    }
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    {
        startRecording,
        stopRecording,
        resetRecording,
        addLocation
    },
    initialState
);
