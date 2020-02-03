import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as authContext } from '../../context/authContext';
import AuthForm from '../../components/AuthForm';
import NavLink from '../../components/NavLink';

const SignInScreen = () => {
    const { state, signIn, clearErrorMessage } = useContext(
        authContext
    );
    return (
        <View style={styles.containerStyle}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm
                headerText='Sign in for Tracker'
                errorMessage={state.errorMessage}
                submitButtonText='Sign In'
                onSubmit={(email, password) => signIn(email, password)}
            />
            <NavLink
                text='Dont have an account? Sign up instead ..'
                routeName='SignUp'
            />
        </View>
    );
};

SignInScreen.navigationOptions = () => {
    return {
        header: () => false
    };
};

const styles = StyleSheet.create({
    containerStyle: {
        marginBottom: 250,
        flex: 1,
        justifyContent: 'center'
    },
    navigationStyle: {
        color: 'blue',
        fontSize: 16
    }
});

export default SignInScreen;
