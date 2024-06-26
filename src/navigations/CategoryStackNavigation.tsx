import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search'
import CategorySearchResult from './CategorySearchResult'

const Stack = createNativeStackNavigator()

const CategoryStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={CategorySearchResult}
        options={{ title: 'Search Result' }}
      />
    </Stack.Navigator>
  )
}

export default CategoryStackNavigation
