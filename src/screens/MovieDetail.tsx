import { API_ACCESS_TOKEN } from '@env'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { days, months, Movie, MovieInfo } from '../types/app'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import MovieList from '../components/MovieList'
import { removeFavorite } from '../lib/removeFavorite'
import { checkIsFavorite } from '../lib/checkIsFavorite'
import { addFavorite } from '../lib/addFavorite'

const MovieInfoItem = ({
  label,
  value,
  isDate = false,
}: MovieInfo): JSX.Element => {
  const checkIsDate = (value: string | number | Date): string => {
    if (isDate) {
      const date = new Date(value)
      const day = date.getDay()
      const month = date.getMonth()
      const year = date.getFullYear()
      return `${days[day]} ${months[month]} ${day} ${year}`
    }
    return value.toString()
  }

  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      <Text style={{ fontSize: 14 }}>{checkIsDate(value)}</Text>
    </View>
  )
}

const MovieDetail = ({ route }: any) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [movie, setMovies] = useState<Movie>()
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
    <>
      {movie && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <ImageBackground
              resizeMode="cover"
              style={{
                width: '100%',
                height: 300,
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
              }}
            >
              <LinearGradient
                colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
                locations={[0.6, 0.8]}
                style={styles.gradientStyle}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={12} color="yellow" />
                      <Text style={styles.rating}>
                        {movie.vote_average.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      isFavorite
                        ? removeFavorite(movie.id, setIsFavorite)
                        : addFavorite(setIsFavorite, movie)
                    }}
                  >
                    <FontAwesome
                      name={isFavorite ? 'heart' : 'heart-o'}
                      size={24}
                      color="pink"
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>

            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 16,
                display: 'flex',
                gap: 16,
              }}
            >
              <Text style={styles.movieOverview}>{movie.overview}</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoWrapper}>
                  <MovieInfoItem
                    label="Original Language"
                    value={movie.original_language}
                  />
                  <MovieInfoItem
                    label="Release Date"
                    value={movie.release_date}
                    isDate={true}
                  />
                </View>
                <View style={styles.infoWrapper}>
                  <MovieInfoItem label="Popularity" value={movie.popularity} />
                  <MovieInfoItem label="Vote Count" value={movie.vote_count} />
                </View>
              </View>
            </View>

            <View style={{ marginVertical: 16 }}>
              <MovieList
                title="Recommendation"
                path={`/movie/${id}/recommendations`}
                key={movie?.title}
                coverType="poster"
              />
            </View>
          </View>
        </ScrollView>
      )}

      {!movie && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size={48} />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    minHeight: '100%',
  },
  infoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 48,
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  movieOverview: {
    fontSize: 14,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    color: 'yellow',
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
})

export default MovieDetail
