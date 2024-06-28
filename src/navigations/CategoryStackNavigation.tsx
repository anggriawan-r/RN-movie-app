import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search'
import CategorySearchResult from '../screens/CategorySearchResult'
import MovieDetail from '../screens/MovieDetail'

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
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: 'Movie Detail' }}
      />
    </Stack.Navigator>
  )
}

export default CategoryStackNavigation
