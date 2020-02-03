import React, { useEffect, useContext } from 'react';
import { Context as authContext } from '../context/authContext';

const LoadingScreen = () => {
    const { localSignIn } = useContext(authContext);

    useEffect(() => {
        localSignIn();
    }, []);

    return null;
};

export default LoadingScreen;
