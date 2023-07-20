import React from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useGoogle } from '../../hooks/use-google';

interface GoogleSignButtonProps {

};

function GoogleSignButton({}:GoogleSignButtonProps) {
    const {google,isLoading} = useGoogle(); 
    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={()=>google({service:"login"})}
            disabled={isLoading}
        />
    );
};

export default GoogleSignButton;