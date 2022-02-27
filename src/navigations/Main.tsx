import React, {useState} from 'react';
import {Button, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import MainScreen from '../screens/MainScreen/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {colors} from '../constants';

// Define types for each screen and their params that you will pass like now the breed name is required as param when you want to navigate to DetailsScreen.
export type RootStackParamList = {
  MainScreen: undefined;
  DetailsScreen: {breed: string; subBreed: string};
};
// Props type for navigation
export type homeScreenPropNav = NativeStackNavigationProp<
  RootStackParamList,
  'MainScreen'
>;
// Props type for navigation
export type DetailsScreenPropNav = RouteProp<
  RootStackParamList,
  'DetailsScreen'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  const [isSorted, setIsSorted] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: 'Doggy McDogFace',
            headerStyle: {backgroundColor: colors.blue},
            headerTintColor: colors.white,
            headerTitleStyle: {fontWeight: '700'},
            headerRight: () => (
              <Button
                onPress={() => setIsSorted(!isSorted)}
                title="Flip Sort"
                color={Platform.OS === 'ios' ? colors.white : colors.blue}
              />
            ),
          }}
          name="MainScreen">
          {props => <MainScreen {...props} isSorted={isSorted} />}
        </Stack.Screen>

        <Stack.Screen
          options={({route}) => ({
            title:
              route?.params?.subBreed.replace(/^./, str => str.toUpperCase()) ??
              'Details',
            headerStyle: {backgroundColor: colors.blue},
            headerTintColor: colors.white,
            headerTitleStyle: {fontWeight: '700'},
          })}
          name="DetailsScreen"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
