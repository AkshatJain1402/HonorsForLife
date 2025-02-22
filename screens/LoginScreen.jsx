import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log('Login button clicked');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8081/api/v1/users/login',
        {email, password},
      );

      await AsyncStorage.setItem('userToken', response.data.token);
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          disabled={loading}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
        ;
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Signup');
          }}
          disabled={loading}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>{'Register Now'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 48,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333',
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Login;
