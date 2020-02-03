import React, { useContext } from 'react';
import { Context as authContext } from '../../context/authContext';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import NavLink from '../../components/NavLink';

const SignUpScreen = () => {
    const { state, signUp, clearErrorMessage } = useContext(authContext);

    return (
        <View style={styles.containerStyle}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm
                headerText='Sign up for Tracker'
                errorMessage={state.errorMessage}
                submitButtonText='Sign Up'
                onSubmit={(email, password) => signUp(email, password)}
            />
            <NavLink
                text='Already have an account? Sign in instead ...'
                routeName='SignIn'
            />
        </View>
    );
};

SignUpScreen.navigationOptions = () => {
    return {
        header: () => false
    };
};

const styles = StyleSheet.create({
    containerStyle: {
        marginBottom: 250,
        flex: 1,
        justifyContent: 'center'
    }
});

export default SignUpScreen;
