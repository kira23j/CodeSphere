import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import GoBack from '../../../components/GoBack';
import Input from '../../../components/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../../configs/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Hide the header when this component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  // Function to handle account creation
  const onCreateAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show("Please enter all the details", ToastAndroid.LONG);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.LONG);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/Home');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      });
  };

  return (
    <View style={styles.container}>
      <GoBack />
      {/* Gradient header with signup title */}
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}>
        <Text style={styles.headerText}>Signup</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.title}>REGISTER</Text>

        {/* Input fields for user details */}
        <Input 
          title="Full Name" 
          placeholder="Enter Full Name" 
          keyboard="default" 
          onChangeText={setFullName}
        />
        <Input 
          title="Email" 
          placeholder="testemail@gmail.com" 
          keyboard="email-address" 
          onChangeText={setEmail}
        />
        <Input 
          title="Password" 
          placeholder="********" 
          keyboard="default" 
          is_password={true} 
          onChangeText={setPassword}
        />
        <Input 
          title="Confirm Password" 
          placeholder="********" 
          keyboard="default" 
          is_password={true} 
          onChangeText={setConfirmPassword}
        />

        {/* Gradient button for signup */}
        <LinearGradient
          colors={['#42a1f5', '#03bafc', '#42c5f5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.signupButton}>
          <TouchableOpacity onPress={onCreateAccount}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Link to sign-in page */}
        <TouchableOpacity onPress={() => router.replace('auth/sign-in')}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stylesheet for the SignUp component
const styles = {
  container: {
    flex: 1,
  },
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
  formContainer: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    marginTop: -20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#03bafc',
    textAlign: 'center',
  },
  signupButton: {
    borderRadius: 100,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    marginTop: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
    fontWeight:'bold'
  },
  signInText: {
    color: '#03bafc',
    fontSize: 16,
    textAlign: 'center',
  },
  signInLink: {
    textDecorationLine: 'underline',
  },
};
