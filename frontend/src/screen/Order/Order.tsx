import { useAccountNavigation } from '../../routes';
import React from 'react';
import { Text, View } from 'react-native'

interface OrderProps {

};

function Order({}:OrderProps) {
    const {route} = useAccountNavigation(); 
    const {orderId} = route.params!||{}; 
    return (
        <View>
           <Text>Order {orderId}</Text>
        </View>
    );
};

export default Order;