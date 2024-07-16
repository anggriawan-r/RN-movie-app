import { removeFavorite } from '../lib/removeFavorite'
import { checkIsFavorite } from '../lib/checkIsFavorite'
import { addFavorite } from '../lib/addFavorite'
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MovieItem from '../components/MovieItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MovieDetailProps {
  route: {
    params: {
      id: number;
    };
  };
}

interface MovieDetailData {
  adult: boolean;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

const MovieDetail = ({ route }: MovieDetailProps): JSX.Element => {
  const { id } = route.params;
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`;

      const movieOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjc2Zjk5ZDUzMGFlMTU5YTY1MTI3ZGNjOWIxZThlMCIsInN1YiI6IjY2NmQxNzYxYzQxZjhlOTBlMzMxOWUxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pUXFNJSByu66jU1qHHDYXbqaxSXSoHdB11QtMSYAvOI`,
        },
      };

      try {
        const movieResponse = await fetch(movieUrl, movieOptions);
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const isFav = await checkIsFavorite(movieData.id);
        setIsFavorite(isFav);

        const recommendationsResponse = await fetch(recommendationsUrl, movieOptions);
        if (!recommendationsResponse.ok) {
          throw new Error('Failed to fetch recommendations data');
        }
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const checkIsFavorite = async (movieId: number): Promise<boolean> => {
    try {
      const storedFavorite = await AsyncStorage.getItem('@FavoriteList');
      if (storedFavorite) {
        const favorites = JSON.parse(storedFavorite);
        return favorites.some((fav: any) => fav.id === movieId);
      }
      return false;
    } catch (error) {
      console.error('Error checking favorite status', error);
      return false;
    }
  };

  const addFavorite = async (movie: MovieDetailData): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      console.log(initialData);

      let favMovieList: MovieDetailData[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding to favorites', error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      console.log(initialData);

      if (initialData !== null) {
        let favMovieList: MovieDetailData[] = JSON.parse(initialData);
        favMovieList = favMovieList.filter((movie) => movie.id !== id);
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error removing from favorites', error);
    }
  };

  if (loading || !movie) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {movie.backdrop_path ? (
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          style={styles.backdrop}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 1]}
            style={styles.gradient}
          >
            <Text style={styles.title}>{movie.title}</Text>
            <TouchableOpacity onPress={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)} style={styles.favoriteIcon}>
              <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color="red" />
            </TouchableOpacity>
            <View style={styles.flexrow2}>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>
                  {movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      ) : (
        <View style={styles.noImageContainer}>
          <Text>No Image Available</Text>
        </View>
      )}
      <Text style={styles.overview}>{movie.overview}</Text>
      <View style={styles.flexrow}>
        <View style={styles.flex}>
          <Text style={styles.detailLabel}>Original Language: </Text>
          <Text>{movie.original_language}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.detailLabel}>Popularity: </Text>
          <Text>{movie.popularity}</Text>
        </View>
      </View>
      <View style={styles.flexrow}>
        <View style={styles.flex}>
          <Text style={styles.detailLabel}>Release date: </Text>
          <Text>{movie.release_date}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.detailLabel}>Vote Count: </Text>
          <Text>{movie.vote_count}</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Genres</Text>
      <View style={styles.genresContainer}>
        {movie.genres.map((genre) => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Production Companies</Text>
        <View style={styles.productionContainer}>
          {movie.production_companies.map((company) => (
            <View key={company.id} style={styles.companyContainer}>
              {company.logo_path ? (
                <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${company.logo_path}` }}
                style={styles.companyLogo}
                resizeMode="contain"
              />
              ) : null}
            </View>
          ))}
        </View>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.titleR}>Recommendations</Text>
      </View>
      <FlatList
        style={styles.recommendationList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recommendations}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://www.themoviedb.org/movie/${item.id}`)}
            style={styles.recommendationItem}
          >
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 0,
    lineHeight: 32,
  },
  flexrow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    color: 'yellow',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  overview: {
    fontSize: 16,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
    textAlign: 'justify',
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    lineHeight: 20,
  },
  purpleLabel: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginHorizontal: 8,
  },
  titleR: {
    fontSize: 20,
    fontWeight: '900',
  },
  recommendationList: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  recommendationItem: {
    marginRight: 8,
  },
  homepageContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  homepageLink: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  flex: {
    flex: 1,
    marginLeft: 16,
    paddingBottom: 8,
    lineHeight: 28,
  },
  noImageContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    lineHeight: 24,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    // justifyContent: 'center',
  },
  genre: {
    marginLeft: 8,
    marginBottom: 8,
    backgroundColor: '#C7C7C7',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 16,
    lineHeight: 20,
  },
  productionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
    lineHeight: 28,
  },
  companyContainer: {
    marginRight: 8,
    marginBottom: 8,
  },
  companyLogo: {
    width: 100,
    height: 50,
    marginLeft: 12,
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 1,
  },
});

export default MovieDetail;
