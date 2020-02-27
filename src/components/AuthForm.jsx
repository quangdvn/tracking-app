import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
import Colors from '../constants/Colors';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>

            <Input
                label='Email'
                placeholder='Enter your email address here ...'
                value={email}
                onChangeText={newEmail => setEmail(newEmail)}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Spacer />
            <Input
                secureTextEntry={true}
                label='Password'
                placeholder='Enter your password here ...'
                value={password}
                onChangeText={newPassword => setPassword(newPassword)}
                autoCapitalize='none'
                autoCorrect={false}
            />

            {errorMessage ? (
                <Text style={styles.errorStyle}>{errorMessage}</Text>
            ) : null}

            <Spacer>
                <Button
                    buttonStyle={styles.button}
                    titleStyle={styles.text}
                    type={Platform.OS === 'android' ? 'solid' : 'clear'}
                    title={submitButtonText}
                    onPress={() => onSubmit(email, password)}
                />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorStyle: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    button: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : null
    },
    text: {
        color: Platform.OS === 'android' ? 'white' : Colors.accent
    }
});

export default AuthForm;
