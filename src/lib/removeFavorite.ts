import AsyncStorage from '@react-native-async-storage/async-storage'
import { Movie } from '../types/app'

export const removeFavorite = async (
  movieId: number,
  setIsFavorite: (arg: boolean) => void,
): Promise<void> => {
  try {
    const initialData: string | null =
      await AsyncStorage.getItem('@FavoriteList')

    if (initialData === null) {
      throw new Error ('No favorite list found')
    }

    const favMovieList: Movie[] = JSON.parse(initialData)
    const newFavMovieList = favMovieList.filter(
      (favMovie: Movie) => favMovie.id !== movieId,
    )
    await AsyncStorage.setItem('@FavoriteList', JSON.stringify(newFavMovieList))
    setIsFavorite(false)
  } catch (error) {
    console.log(error)
  }
}