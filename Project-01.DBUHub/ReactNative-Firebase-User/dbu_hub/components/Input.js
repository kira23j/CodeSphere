import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ title, placeholder, keyboardType, is_password, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.input}
        secureTextEntry={is_password} // Ensure this is set correctly
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#03bafc',
  },
  input: {
    borderBottomColor: '#03bafc',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginTop: 5,
  },
});

export default Input;
