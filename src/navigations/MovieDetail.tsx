import React from 'react'
import { Text, View } from 'react-native'
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
=======
>>>>>>> d906d29362bda9f3c2338377881b97bd0fa9fb85

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params

  const getMovie = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    const response = await fetch(url, options)
    const result: Movie = await response.json()
    setMovies(result)
  }

  useEffect(() => {
    getMovie()
    if (movie) {
      checkIsFavorite(movie?.id, setIsFavorite)
    }
  }, [movie])

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 32,
      }}
    >
      <Text style={{ fontSize: 30 }}>Movie id: {id}</Text>
    </View>
  )
}

export default MovieDetail;