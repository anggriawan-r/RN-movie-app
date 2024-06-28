import React from 'react'
import { Text, View } from 'react-native'
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
=======
>>>>>>> d906d29362bda9f3c2338377881b97bd0fa9fb85

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 32,
      }}
    >
      <Text style={{ fontSize: 30 }}>Movie ID: {id}</Text>
    </View>
  )
}

export default MovieDetail;