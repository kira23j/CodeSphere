import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import GoBack from '../../../components/GoBack';
import { getDatabase, ref, push } from "firebase/database";
import { app } from '../../../configs/FirebaseConfig';

const Feedback = () => {
  // State hooks for managing input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  // Function to handle feedback submission
  const submitFeedback = () => {
    // Check if all fields are filled
    if (name && email && feedback) {
      const db = getDatabase(app);
      const feedbackRef = ref(db, 'feedbacks');
      
      // Push feedback to Firebase
      push(feedbackRef, {
        name,
        email,
        feedback,
      })
      .then(() => {
        // Show success alert and reset fields
        Alert.alert('Success', 'Thank you for your feedback!');
        setName('');
        setEmail('');
        setFeedback('');
      })
      .catch((error) => {
        // Show error alert
        Alert.alert('Error', 'Could not submit feedback. Please try again.');
        console.error(error);
      });
    } else {
      // Show error alert if fields are missing
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/service.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <GoBack />
        <Text style={styles.title}>Feedback & Support</Text>
    
        <ScrollView contentContainerStyle={styles.formContainer}>
          {/* Input field for name */}
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          {/* Input field for email */}
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {/* Input field for feedback */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Feedback"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={5}
            value={feedback}
            onChangeText={setFeedback}
          />
          {/* Submit button */}
          <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Feedback;

// Styles for the Feedback component
const styles = StyleSheet.create({
  background: {
    flex: 1, // Make background cover entire screen
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'outfit-bold', // Font for title
    color: '#009786',
    marginTop: 50, // Margin from top
    textAlign: 'center', // Center-align text
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center align form content
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#34495e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4, // Elevation for shadow effect
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', // Align text at the top of the textarea
  },
  submitButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6, // Elevation for shadow effect
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: 'outfit-bold', // Font for button text
    color: '#fff',
  },
});
