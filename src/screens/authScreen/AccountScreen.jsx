import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as authContext } from '../../context/authContext';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../../components/Spacer';
import { EvilIcons } from '@expo/vector-icons';

const AccountScreen = () => {
    const { signOut } = useContext(authContext);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text style={{ fontSize: 50 }}>This is account screen</Text>
            <Spacer>
                <Button title='Sign Out' onPress={signOut} />
            </Spacer>
        </SafeAreaView>
    );
};

AccountScreen.navigationOptions = () => {
    return {
        title: 'Manage your Account',
        tabBarIcon: <EvilIcons name='gear' size={20} />
    };
};

const styles = StyleSheet.create({});

export default AccountScreen;
