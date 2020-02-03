import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default (shouldTrack, callback) => {
    const [error, setError] = useState(null);

    //* Put all function in the dependencies list
    useEffect(() => {
        let subscriber = null;

        const startTracking = async () => {
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setError('Permission to access location was denied');
                }
                subscriber = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 2000, //* 1s
                        distanceInterval: 10 //* 10 meters
                    },
                    callback
                );
            } catch (err) {
                setError(err);
            }
        };
        if (shouldTrack) {
            startTracking();
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);

    return [error];
};
