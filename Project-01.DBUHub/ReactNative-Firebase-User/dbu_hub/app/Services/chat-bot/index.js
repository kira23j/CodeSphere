import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import GoBack from "../../../components/GoBack";

const backgroundImg = require('../../../assets/images/service.jpg');

const GeminiChat = () => {
  // State hooks for managing chat messages, user input, loading status, speech state, and visibility of the stop icon
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);

  // API key for Google Generative AI
  const API_KEY = "AIzaSyD0PiL6kILxZ2qOto_1ZwlwvAoU11YEKJ0";

  // Initialize chat and display a welcome message when the component mounts
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "hello!";
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        showMessage({
          message: "Welcome to Gemini Chat 🤖",
          description: text,
          type: "info",
          icon: "info",
          duration: 2000,
        });
        setMessages([{ text, user: false }]);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initializeChat();
  }, []);

  // Handle sending a message
  const sendMessage = async () => {
    if (userInput.trim() === "") return; // Exit if the input is empty

    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userMessage.text);
      const text = await result.response.text();
      setMessages((prevMessages) => [...prevMessages, { text, user: false }]);

      if (text && !isSpeaking) {
        Speech.speak(text);
        setIsSpeaking(true);
        setShowStopIcon(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  // Toggle speech playback
  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setShowStopIcon(false);
    } else {
      Speech.speak(messages[messages.length - 1]?.text || "");
      setIsSpeaking(true);
      setShowStopIcon(true);
    }
  };

  // Clear all messages and reset speech state
  const clearMessages = () => {
    setMessages([]);
    setIsSpeaking(false);
    setShowStopIcon(false);
  };

  // Render individual message
  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.user && styles.userMessageContainer]}>
      <Text style={[styles.messageText, item.user && styles.userMessageText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <>
      <GoBack style={styles.goBack} />
      <ImageBackground source={backgroundImg} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Gemini Chat</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.text}
          inverted
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
            <FontAwesome
              name={isSpeaking ? "microphone-slash" : "microphone"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message"
            onChangeText={setUserInput}
            value={userInput}
            onSubmitEditing={sendMessage}
            style={styles.input}
            placeholderTextColor="#888"
          />
          {showStopIcon && (
            <TouchableOpacity style={styles.stopIcon} onPress={clearMessages}>
              <Entypo name="controller-stop" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          {loading && <ActivityIndicator size="large" color="#000" style={styles.loading} />}
        </View>
        <FlashMessage position="top" />
      </ImageBackground>
    </>
  );
};

// Styles for the GeminiChat component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  header: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  goBack: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  messageList: {
    paddingBottom: 80, // Space for the input container
  },
  messageContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 15,
    backgroundColor: "#fff",
    maxWidth: '80%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: "#d4edda",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  userMessageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: "#e8e8e8",
    borderRadius: 20,
    marginHorizontal: 8,
    color: "#000",
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#dc3545",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  loading: {
    marginLeft: 10,
  },
});

export default GeminiChat;
