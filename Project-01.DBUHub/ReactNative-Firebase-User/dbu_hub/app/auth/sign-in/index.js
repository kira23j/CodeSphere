import { View, Text, TouchableOpacity, Image, Dimensions, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import GoBack from '../../../components/GoBack';
import Input from '../../../components/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hide the header when this component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  // Function to handle sign-in process
  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter email and password", ToastAndroid.SHORT);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed in successfully, navigate to Home
        const user = userCredential.user;
        router.replace('/Home');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        if (errorCode === 'auth/invalid-credential') {
          ToastAndroid.show("Invalid credentials", ToastAndroid.LONG);
        }
      });
  };

  return (
    <View>
      {/* Gradient header with app title */}
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}>
        <Text style={styles.headerText}>DBU-Hub</Text>
      </LinearGradient>

      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>LOGIN</Text>

        {/* Input for email */}
        <Input 
          title="Email" 
          placeholder="test@test.com" 
          keyboard="default" 
          onChangeText={(value) => setEmail(value)} 
        />

        {/* Input for password */}
        <Input
          title="Password"
          placeholder="********"
          keyboard="default"
          is_password={true}
          onChangeText={(value) => setPassword(value)}
        />

        {/* Gradient button for login */}
        <LinearGradient
          colors={['#42a1f5', '#03bafc', '#42c5f5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.loginButton}>
          <TouchableOpacity onPress={onSignIn}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Link to sign up page */}
        <TouchableOpacity onPress={() => router.replace('auth/sign-up')}>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink}>Signup</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Go back button */}
      <GoBack />
    </View>
  );
}

// Stylesheet for the SignIn component
const styles = {
  header: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: Dimensions.get('window').height * 0.2,
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 31,
    fontWeight: 'bold',
  },
  loginContainer: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    marginTop: -20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loginTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#03bafc',
    textAlign: 'center',
  },
  loginButton: {
    borderRadius: 100,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 50,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 19,
    fontWeight:'bold'
  },
  signUpText: {
    color: '#03bafc',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpLink: {
    textDecorationLine: 'underline',
  },
};

