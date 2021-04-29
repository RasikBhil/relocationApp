import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as routes from './routes';
import {Home} from '../screens';
import {colors} from '../../theme';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.gray,
          },
          headerTintColor: colors.black,
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name={routes.HOME_SCREEN}
          component={Home}
          options={{title: 'Add Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
