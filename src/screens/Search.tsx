import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import KeywordSearch from '../components/search/KeywordSearch'
import CategorySearch from '../components/search/CategorySearch'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = (): JSX.Element => {
  const [selectedBar, setSelectedBar] = useState<string>('keyword')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        {['keyword', 'category'].map((item: string, _) => (
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
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
    lineHeight: 20,
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})

export default Search
