import { View, StyleSheet } from 'react-native';
import React from 'react';
import Welcome from '../components/welcome';

// Main component for the index screen
const Index = () => {
  return (
    <View style={styles.container}>
      <Welcome />
    </View>
  );
};

export default Index;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View takes up the full available space
  },
});
