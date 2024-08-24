import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';

// Welcome screen component
const Welcome = () => {
  const router = useRouter();
  
  // Load custom fonts
  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={require('../assets/images/welcome.jpg')}
        style={styles.image}
      />

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>DBUHub</Text>

        {/* Welcome message */}
        <Text style={styles.subtitle}>
          Welcome to Debre Birhan University Hub – Your Journey Starts Here!
        </Text>

        {/* Get Started button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('auth/sign-in')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



// Styles for the Welcome component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 460,
  },
  content: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 31,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 19,
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 99,
    backgroundColor: Colors.PRIMARY,
    marginTop: '20%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit',
    fontSize: 17,
  },
});
export default Welcome;