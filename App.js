import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;