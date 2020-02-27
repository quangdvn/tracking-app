import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
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
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import Colors from './src/constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const trackListFlow = createStackNavigator(
    {
        TrackList: TrackListScreen,
        TrackDetail: TrackDetailScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            title: 'Tracks',
            tabBarIcon: <FontAwesome name='th-list' size={20} />
        }
    }
);

const trackCreateFlow = createStackNavigator(
    {
        trackCreate: TrackCreateScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            title: 'Create',
            tabBarIcon: <EvilIcons name='gear' size={20} />
        }
    }
);

const AccountFlow = createStackNavigator(
    {
        Account: AccountScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            tabBarIcon: <FontAwesome name='plus' size={20} />
        }
    }
);

const unAuthFlow = createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen
});

const bottomTabConfig = {
    trackListFlow,
    TrackCreate: trackCreateFlow,
    Account: AccountFlow
};

const authFlow =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(bottomTabConfig, {
              activeTintColor: Colors.accent,
              shifting: true
          })
        : createBottomTabNavigator(bottomTabConfig, {
              tabBarOptions: {
                  activeTintColor: Colors.accent,
                  labelStyle: {
                      fontSize: 13
                  }
              }
          });

const switchNavigator = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        unAuthFlow,
        authFlow
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
