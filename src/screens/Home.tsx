import React from 'react'
import HomeStackNavigation from '../navigations/HomeStackNavigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../navigations/MovieDetail'

const Tab = createNativeStackNavigator()

function Home(): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStackNavigation} />
      <Tab.Screen name="MovieDetail" component={MovieDetail} />
    </Tab.Navigator>
  )
}

export default Home