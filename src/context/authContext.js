import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerAPI from '../api/trackerAPI';
import { navigateTo } from '../navigationRef';

const initialState = {
    token: null,
    errorMessage: ''
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return { ...state, errorMessage: '', token: action.payload };

        case 'AUTH_ERROR':
            return { ...state, errorMessage: action.payload };

        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' };

        case 'CLEAR_TOKEN':
            return { ...state, token: null, errorMessage: '' };

        default:
            return state;
    }
};

const signUp = dispatch => async (email, password) => {
    try {
        const { data } = await trackerAPI.post('/auth/signup', {
            email,
            password
        });
        await AsyncStorage.setItem('token', data.token);

        dispatch({ type: 'AUTH_SUCCESS', payload: data.token });

        navigateTo('TrackList');
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR',
            payload: 'Something went wrong ...'
        });
    }
};

const signIn = dispatch => async (email, password) => {
    try {
        const { data } = await trackerAPI.post('/auth/signin', {
            email,
            password
        });
        await AsyncStorage.setItem('token', data.token);

        dispatch({ type: 'AUTH_SUCCESS', payload: data.token });

        navigateTo('TrackList');
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR',
            payload: 'Something went wrong ...'
        });
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' });
};

const localSignIn = dispatch => async () => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            dispatch({ type: 'AUTH_SUCCESS', payload: token });

            navigateTo('TrackList');
        } else {
            navigateTo('SignIn');
        }
    } catch (err) {
        console.log(err);
    }
};

const signOut = dispatch => async () => {
    try {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'CLEAR_TOKEN' });

        navigateTo('unAuthFlow');
    } catch (err) {
        console.log(err);
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signUp, signIn, signOut, clearErrorMessage, localSignIn },
    initialState
);
