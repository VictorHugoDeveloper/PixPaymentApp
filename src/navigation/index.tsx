import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import PaymentScreen from '../screens/Payment/PaymentScreen';
import { Splash } from '../screens/SplashScreen';
import { ProcessingPayment } from '../screens/ProcessingPayment/ProcessingPayment';
import { PaymentReceipt } from '../screens/PaymentReceipt/PaymentReceipt';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={Splash} 
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen} 
          options={{ 
            title: 'Pagamento PIX',
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="ProcessingPayment" 
          component={ProcessingPayment} 
        />
        <Stack.Screen 
          name="PaymentReceipt" 
          component={PaymentReceipt} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 