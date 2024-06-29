import { View, StatusBar, FlatList, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Movie } from '../types/app'
import { getFavorite } from '../lib/getFavorite'
import MovieItem from '../components/MovieItem'
import { useFocusEffect } from '@react-navigation/native'

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState<Movie[]>([])

  useFocusEffect(
    useCallback(() => {
      getFavorite().then((data) => setFavoriteList(data))
    }, []),
  )

  return (
    <>
      {favoriteList.length > 0 ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            marginTop: StatusBar.currentHeight! + 8,
            paddingHorizontal: 8,
          }}
        >
          <FlatList
            data={favoriteList}
            numColumns={3}
            contentContainerStyle={{
              gap: 8,
            }}
            columnWrapperStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <MovieItem
                movie={item}
                size={{
                  width: '100%',
                  height: 160,
                }}
                containerStyles={{ flex: 1, width: '100%' }}
                coverType="poster"
                key={item.id}
              />
            )}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Your favorite list is empty.</Text>
        </View>
      )}
    </>
  )
}

export default Favorite
