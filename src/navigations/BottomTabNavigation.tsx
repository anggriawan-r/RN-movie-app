import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import Home from '../screens/Home'
import Favorite from '../screens/Favorite'
import CategoryStackNavigation from './CategoryStackNavigation'

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
        name="Home"
        component={Home}
        options={{
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
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="search"
              size={28}
              color={focused ? '#9986b8' : '#767C81'}
            />
          ),
          headerShown: false,
          title: 'Search',
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="heart"
              size={28}
              color={focused ? '#9986b8' : '#767C81'}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
