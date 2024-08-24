import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

// SearchComponent for inputting and submitting search queries
const SearchComponent = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <View style={styles.searchContainer}>
      {/* Input field for search query */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a location"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* Button to trigger the search */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the SearchComponent
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: '#333',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 40,
  },
  searchButton: {
    height: 40,
    backgroundColor: '#03bafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: -1, // Align button with the input
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SearchComponent;
