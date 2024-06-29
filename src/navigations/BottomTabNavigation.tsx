import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import Favorite from '../screens/Favorite'
import CategoryStackNavigation from './CategoryStackNavigation'
import HomeStackNavigator from './HomeStackNavigation'
import FavoriteStackNavigation from './FavoriteStackNavigation'

const Tab = createBottomTabNavigator()

function BottomTabNavigation(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#9986b8',
        tabBarInactiveTintColor: '#767C81',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="home"
              size={28}
              color={focused ? '#9986b8' : '#767C81'}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="SearchStack"
        component={CategoryStackNavigation}
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="search"
              size={28}
              color={focused ? '#9986b8' : '#767C81'}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="FavoriteNavigation"
        component={FavoriteStackNavigation}
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
