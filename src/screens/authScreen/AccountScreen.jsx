import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as authContext } from '../../context/authContext';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../../components/Spacer';
import { EvilIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const AccountScreen = () => {
    const { signOut } = useContext(authContext);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Spacer>
                <Button
                    buttonStyle={styles.button}
                    titleStyle={styles.text}
                    title='Sign Out'
                    onPress={signOut}
                />
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

const styles = StyleSheet.create({
    button: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : null
    },
    text: {
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default AccountScreen;
