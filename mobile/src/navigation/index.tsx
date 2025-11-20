import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {colors} from '../theme';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {ComparisonScreen} from '../screens/ComparisonScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Comparison: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.textPrimary,
    primary: colors.accent,
    card: colors.surface,
    border: colors.surface,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Comparison" component={ComparisonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
