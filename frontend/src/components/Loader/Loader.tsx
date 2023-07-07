import React from 'react';
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native';

interface LoaderProps {

};

function Loader({}:LoaderProps) {
    return (
        <View className='flex-1 flex flex-col items-center justify-center bg-white'>
            <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('./assets/loading.json')}
            />
        </View>
    );
};

export default Loader;