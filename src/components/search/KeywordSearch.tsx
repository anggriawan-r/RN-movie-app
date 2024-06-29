import {
  View,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { fetchOptions } from '../../lib/fetchOptions'
import { Movie } from '../../types/app'
import MovieItem from '../MovieItem'
import { API_URL } from '@env'
import PaginationButton from './PaginationButton'

const KeywordSearch = () => {
  const [text, onChangeText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState(0)

  const onSubmit = async (
    text: TextInputSubmitEditingEventData['text'],
    page: number = 1,
  ): Promise<void> => {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?query=${text}&include_adult=false&language=en-US&page=${page}`,
        fetchOptions,
      )

      const data = await response.json()
      setMovies(data.results)
      setTotalPage(data.total_pages)
    } catch (error) {
      console.log(error)
    }
  }

  const getNextPage = async () => {
    if (page === totalPage) return
    setPage(page + 1)
  }

  const getPreviousPage = async () => {
    if (page === 1) return

    setPage(page - 1)
  }

  useEffect(() => {
    onSubmit(text, page)
  }, [page])

  return (
    <>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Input title movie here"
          onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          onPress={() => onSubmit(text)}
          style={{ justifyContent: 'center' }}
        >
          <Icon
            name="search"
            size={32}
            color="#9986b8"
            style={{ position: 'absolute', right: 16 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        contentContainerStyle={{
          paddingBottom: 16,
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
        {...(movies.length > 0 && {
          ListFooterComponent: () => (
            <PaginationButton
              getPreviousPage={getPreviousPage}
              getNextPage={getNextPage}
              page={page}
              totalPage={totalPage}
            />
          ),
        })}
      />
    </>
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    backgroundColor: '#e8e6ea',
    width: '100%',
    fontSize: 16,
    height: 56,
    borderRadius: 48,
    marginVertical: 16,
    paddingLeft: 24,
  },
})

export default KeywordSearch
