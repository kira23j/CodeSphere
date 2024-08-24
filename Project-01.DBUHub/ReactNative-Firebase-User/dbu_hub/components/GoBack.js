import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// Component for a "Go Back" button
const GoBack = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default GoBack;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
});
