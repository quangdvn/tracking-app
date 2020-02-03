import * as Location from 'expo-location';

const TEN_METERS_WITH_DEGREES = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 105.804817 + increment * TEN_METERS_WITH_DEGREES,
            latitude: 21.028511 + increment * TEN_METERS_WITH_DEGREES
        }
    };
};

let counter = 0;

setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 2000);
