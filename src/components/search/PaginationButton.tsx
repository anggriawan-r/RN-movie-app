import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
  getPreviousPage: () => void
  getNextPage: () => void
  page: number
  totalPage: number
}

const PaginationButton = ({
  getNextPage,
  getPreviousPage,
  page,
  totalPage,
}: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={getPreviousPage}
        style={[styles.button, { opacity: page === 1 ? 0.5 : 1 }]}
        disabled={page === 1}
      >
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>

      <Text>
        Page {page} of {totalPage}
      </Text>

      <TouchableOpacity
        onPress={getNextPage}
        style={[styles.button, { opacity: page === totalPage ? 0.5 : 1 }]}
        disabled={page === totalPage}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 8,
  },
  button: {
    width: 100,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c3b3d8',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
})

export default PaginationButton
