import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import BottomTabNavigation from './src/navigations/BottomTabNavigation'

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  )
}

export default App
