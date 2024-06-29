import AsyncStorage from '@react-native-async-storage/async-storage'
import { Movie } from '../types/app'

export const getFavorite = async (): Promise<Movie[]> => {
  const initialData: string | null = await AsyncStorage.getItem('@FavoriteList')
  if (initialData === null) {
    return []
  }
  const favMovieList: Movie[] = JSON.parse(initialData)
  return favMovieList
}
