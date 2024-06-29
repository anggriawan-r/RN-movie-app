import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchOptions } from '../../lib/fetchOptions'
import { CategoryProps } from '../../types/app'
import { useNavigation, StackActions } from '@react-navigation/native'
import { API_URL } from '@env'

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
      const response = await fetch(`${API_URL}/genre/movie/list`, fetchOptions)

      const data = await response.json()
      setCategories(data.genres)
    }

    getCategories()
  }, [])

  return (
    <>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
        }}
        columnWrapperStyle={{ gap: 8 }}
        style={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCat({ ...item })}
            key={item.id}
            activeOpacity={0.9}
            style={{
              ...styles.button,
              backgroundColor:
                selectedCat.id === item.id ? '#8d77a6' : '#ded7ec',
              width: Dimensions.get('window').width / 2 - 20,
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

      {selectedCat.id !== 0 && (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.dispatch(pushAction)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
  },
  searchButton: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#8d77a6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 48,
  },
})

export default CategorySearch
