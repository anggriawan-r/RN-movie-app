import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchOptions } from '../../lib/fetchOptions'
import { CategoryProps } from '../../types/app'
import { useNavigation, StackActions } from '@react-navigation/native'

const CategorySearch = () => {
  const navigation = useNavigation()

  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [selectedCat, setSelectedCat] = useState<CategoryProps>({
    id: 0,
    name: '',
  })

  const pushAction = StackActions.push('SearchResult', {
    categoryId: selectedCat.id,
    categoryName: selectedCat.name,
  })

  useEffect(() => {
    const getCategories = async (): Promise<void> => {
      const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list',
        fetchOptions,
      )

      const data = await response.json()
      setCategories(data.genres)
    }

    getCategories()
  }, [])

  return (
    <View style={{ marginTop: 16 }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
        }}
        columnWrapperStyle={{ gap: 4 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCat({ ...item })}
            key={item.id}
            activeOpacity={0.9}
            style={{
              ...styles.button,
              backgroundColor:
                selectedCat.id === item.id ? '#8d77a6' : '#ded7ec',
            }}
          >
            <Text
              style={{ color: selectedCat.id === item.id ? 'white' : 'black' }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.dispatch(pushAction)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
  },
  searchButton: {
    marginTop: 16,
    backgroundColor: '#8d77a6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 48,
  },
})

export default CategorySearch
