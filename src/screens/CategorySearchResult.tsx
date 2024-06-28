import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { fetchOptions } from '../lib/fetchOptions'
import { Movie } from '../types/app'
import MovieItem from '../components/MovieItem'
import { API_URL } from '@env'

const CategorySearchResult = ({ route }: { route: any }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: route.params.categoryName,
    })

    const getMovies = async (): Promise<void> => {
      const response = await fetch(
        `${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${route.params.categoryId}`,
        fetchOptions,
      )
      const data = await response.json()
      setMovies(data.results)
    }
    getMovies()
  }, [])

  return (
    <View style={{}}>
      <FlatList
        data={movies}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        contentContainerStyle={{
          padding: 16,
          gap: 8,
        }}
        columnWrapperStyle={{ gap: 4 }}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={{
              height: 160,
            }}
            containerStyles={{ flex: 1, width: '100%' }}
            coverType="poster"
            key={item.id}
          />
        )}
      />
    </View>
  )
}

export default CategorySearchResult
