import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import GoBack from '../../components/GoBack';

const Services = () => {
  const router = useRouter(); // Initialize the router for navigation

  return (
    <ImageBackground source={require('./../../assets/images/service.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* GoBack component to navigate back */}
        <GoBack style={styles.goBack} />

        {/* Header text for the services screen */}
        <Text style={styles.headerText}>Our Services</Text>

        {/* Touchable component for navigating to the About page */}
        <TouchableOpacity style={styles.touchable} onPress={() => router.push('Services/about')}>
          <Image source={require('./../../assets/images/about.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>About</Text>
          </View>
        </TouchableOpacity>

        {/* Touchable component for navigating to the Chatbot page */}
        <TouchableOpacity style={styles.touchable} onPress={() => router.push('Services/chat-bot')}>
          <Image source={require('./../../assets/images/chatbot.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Gemini-Chatbot</Text>
          </View>
        </TouchableOpacity>

        {/* Touchable component for navigating to the Feedback page */}
        <TouchableOpacity style={styles.touchable} onPress={() => router.push('Services/feedback')}>
          <Image source={require('./../../assets/images/feedback.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Feedback</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Services;

// Stylesheet for the Services component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background image covers the entire screen
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Center items vertically
  },
  goBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'outfit-bold',
    color: '#00bcd4', // Use a consistent theme color
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  touchable: {
    backgroundColor: '#00bcd4', // Button background color
    width: '100%',
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5, // Elevation for shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row', // Row layout for image and text
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  buttonText: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: 'white',
    marginLeft: 10, // Margin between image and text
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35, // Circular image
    borderWidth: 2,
    borderColor: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10, // Padding to vertically center the text
  },
});
