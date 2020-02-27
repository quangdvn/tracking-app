import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/locationContext';
import useTrack from '../hooks/useTrack';

const TrackForm = () => {
    const {
        state: { isRecording, locations },
        startRecording,
        stopRecording
    } = useContext(LocationContext);

    const [saveTrackDetail, saveTrackName, currentTrackName] = useTrack();

    return (
        <>
            <Spacer>
                <Input
                    value={currentTrackName}
                    onChangeText={newName => saveTrackName(newName)}
                    placeholder='Enter your Track name ...'
                />
            </Spacer>
            <Spacer>
                {isRecording ? (
                    <Button title='Stop' onPress={stopRecording} />
                ) : (
                    <Button
                        title='Start recording your Track'
                        onPress={startRecording}
                        disabled={!currentTrackName}
                    />
                )}
            </Spacer>
            <Spacer>
                {!isRecording && locations.length ? (
                    <Button title='Save this Track' onPress={saveTrackDetail} />
                ) : null}
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({});

export default TrackForm;
