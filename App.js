import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as LocationProvider } from './src/context/locationContext';
import { Provider as TrackProvider } from './src/context/trackContext';
import { setNavigator } from './src/navigationRef';
import AccountScreen from './src/screens/authScreen/AccountScreen';
import TrackCreateScreen from './src/screens/authScreen/TrackCreateScreen';
import TrackDetailScreen from './src/screens/authScreen/TrackDetailScreen';
import TrackListScreen from './src/screens/authScreen/TrackListScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import SignUpScreen from './src/screens/unAuthScreen/SignUpScreen';
import SignInScreen from './src/screens/unAuthScreen/SignInScreen';
import { FontAwesome } from '@expo/vector-icons';

const trackListFlow = createStackNavigator({
    TrackList: TrackListScreen,
    TrackDetail: TrackDetailScreen
});

trackListFlow.navigationOptions = () => {
    return {
        title: 'Tracks',
        tabBarIcon: <FontAwesome name='th-list' size={20} />
    };
};

const switchNavigator = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        unAuthFlow: createStackNavigator({
            SignIn: SignInScreen,
            SignUp: SignUpScreen
        }),
        authFlow: createBottomTabNavigator({
            trackListFlow,
            TrackCreate: TrackCreateScreen,
            Account: AccountScreen
        })
    },
    {
        defaultRouteName: 'Loading'
    }
);

const App = createAppContainer(switchNavigator);

export default () => {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <App ref={nav => setNavigator(nav)} />
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    );
};
