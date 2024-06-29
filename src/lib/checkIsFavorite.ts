import AsyncStorage from '@react-native-async-storage/async-storage'
import { Movie } from '../types/app'

export const checkIsFavorite = async (
  movieId: number,
  setIsFavorite: (arg: boolean) => void,
): Promise<void> => {
  try {
    const initialData: string | null =
      await AsyncStorage.getItem('@FavoriteList')
    if (initialData === null) {
      throw new Error('No favorite list found')
    }
    const favMovieList: Movie[] = JSON.parse(initialData)
    const isFavorite = favMovieList.some((movie: Movie) => movie.id === movieId)
    setIsFavorite(isFavorite)
  } catch (error) {
    console.log(error)
    setIsFavorite(false)
  }
}