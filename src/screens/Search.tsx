import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import KeywordSearch from '../components/search/KeywordSearch'
import CategorySearch from '../components/search/CategorySearch'

const Search = (): JSX.Element => {
  const [selectedBar, setSelectedBar] = useState<string>('keyword')

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topBarContainer}>
          {['keyword', 'category'].map((item: string, index: number) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.9}
              style={{
                ...styles.topBar,
                backgroundColor: selectedBar === item ? '#8d77a6' : '#c3b3d8',
              }}
              onPress={() => {
                setSelectedBar(item)
              }}
            >
              <Text
                style={[
                  styles.topBarLabel,
                  { color: selectedBar === item ? 'white' : '#eae9ec' },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedBar === 'keyword' ? <KeywordSearch /> : <CategorySearch />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderRadius: 16,
    backgroundColor: '#e8e6ea',
    padding: 8,
    width: '100%',
  },
  topBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
  },
  topBarLabel: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})

export default Search
