import React, { ReactNode } from 'react';
import { ColorValue, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { View , Text,Dimensions} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { wave_1, wave_2, wave_3 } from './assets/wave-version';
interface WaveProps {
    customHeight?:string | number | undefined,
    customTop?: string | number,
    customBgColor ?:ColorValue ,
    pattern ? : "v1"|"v2"|"v3" 
    children ? : ReactNode
};

const defaultHeight = 100
const defaultTop = 80
const defaultBgColor = "rgb(52, 211, 153)"

function Wave({children,customHeight,customTop,customBgColor,pattern="v1"}:WaveProps) {
    return (
    <View className="" style={{position: 'relative',width: Dimensions.get('window').width,}}>
        <View className=' bg-emerald-400' style={{ backgroundColor: customBgColor??defaultBgColor, height: customHeight??defaultHeight  }}>
            <Svg
                height="100%"
                width="100%"
                viewBox="0 0 1440 320"
                style={{ position: 'absolute', top: customTop??defaultTop}}
            >
                <Path fill={customBgColor??defaultBgColor} d={pattern=="v1"?wave_1:pattern=="v2"?wave_2:wave_3} />
            </Svg>
            <View className='flex-1 flex flex-col items-center justify-center '>
                {children}
            </View>
        </View>
    </View>
    );
};
export default Wave; 