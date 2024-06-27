import React from 'react'
import { Text, View } from 'react-native'

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
      <Text style={{ fontSize: 30 }}>Movie id: {id}</Text>
    </View>
  )
}

export default MovieDetail
