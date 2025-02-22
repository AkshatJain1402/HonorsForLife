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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleVerifyOTP = async () => {
    setError('');
    setLoading(true);

    if (!otp) {
      setError('Please enter the OTP.');
      setLoading(false);
      return;
    }

    try {
      // Retrieve user details from AsyncStorage
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsString);

      const response = await fetch(
        'http://localhost:9000/api/v1/users/register',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...userDetails, otp}),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'OTP verification failed');

      console.log('User Registered:', data.data);
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      navigation.navigate('HomeScreen');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Verify OTP</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#999"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6} // Assuming 6-digit OTP
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleVerifyOTP}
          disabled={loading}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Text>
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
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
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

export default VerifyOTP;
