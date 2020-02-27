import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spacer from './Spacer';
import Colors from '../constants/Colors';

const NavLink = ({ navigation, text, routeName }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate({ routeName })}>
            <Spacer>
                <Text style={styles.navigationStyle}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    navigationStyle: {
        color: Platform.OS === 'android' ? Colors.primary : Colors.accent,
        fontSize: 16
    }
});

export default withNavigation(NavLink);
