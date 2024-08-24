import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';

// Layout component for managing screen navigation
const _layout = () => {
  // Retrieve the current color scheme (light or dark mode)
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  // Render nothing if fonts are not yet loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define stack navigation screens */}
      <Stack.Screen name='index' />
      <Stack.Screen name='(tabs)' />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
