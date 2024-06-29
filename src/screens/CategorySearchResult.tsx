import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { fetchOptions } from '../lib/fetchOptions'
import { Movie } from '../types/app'
import MovieItem from '../components/MovieItem'
import { API_URL } from '@env'
import PaginationButton from '../components/search/PaginationButton'

const CategorySearchResult = ({ route }: { route: any }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: route.params.categoryName,
    })
    getMovies(page)
  }, [page])

  const getMovies = async (page: number = 1): Promise<void> => {
    const response = await fetch(
      `${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${route.params.categoryId}&page=${page}`,
      fetchOptions,
    )
    const data = await response.json()
    setMovies(data.results)
    setTotalPage(data.total_pages)
  }

  const getNextPage = async () => {
    if (page === totalPage) return
    setPage(page + 1)
  }

  const getPreviousPage = async () => {
    if (page === 1) return

    setPage(page - 1)
  }

  return (
    <>
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
        ListFooterComponent={() => (
          <PaginationButton
            getNextPage={getNextPage}
            getPreviousPage={getPreviousPage}
            page={page}
            totalPage={totalPage}
          />
        )}
      />
    </>
  )
}

export default CategorySearchResult
