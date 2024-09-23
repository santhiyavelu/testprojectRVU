/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import HomeScreen from './Screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {calculateAnnualCharge, logPlanPrices} from './utils';
import {plansData} from './mock/planMockData';

const ANNUAL_USAGE = 100; // kWh usage

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  // Step 1
  console.log('Step 1');
  const totalCharge = calculateAnnualCharge(plansData[0], ANNUAL_USAGE);
  console.log(totalCharge, 'totalcharge');

  // //Step 2
  console.log('step 2');
  console.log(logPlanPrices(plansData, ANNUAL_USAGE));

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 32,

    fontWeight: '600',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
