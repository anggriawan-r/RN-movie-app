import {
  View,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { fetchOptions } from '../../lib/fetchOptions'
import { Movie } from '../../types/app'
import MovieItem from '../MovieItem'

const KeywordSearch = () => {
  const [text, onChangeText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  const onSubmit = async (
    text: TextInputSubmitEditingEventData['text'],
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${text}&include_adult=false&language=en-US`,
        fetchOptions,
      )

      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      console.log(error)
    }
  }

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
        fadingEdgeLength={32}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        contentContainerStyle={{
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
