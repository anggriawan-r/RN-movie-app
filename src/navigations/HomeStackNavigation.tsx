// src/navigations/HomeStackNavigation.tsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from './MovieDetail'
import { RootStackParamList } from '../types/app'

const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
