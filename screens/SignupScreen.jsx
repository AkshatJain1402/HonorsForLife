import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSendOTP = async () => {
    console.log('Send OTP button clicked');
    setError('');
    setLoading(true);

    if (!formData.email) {
      setError('Please enter an email to receive OTP.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        'http://192.168.1.6:9000/api/v1/users/send-otp',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email: formData.email}),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

      console.log('OTP Sent to:', formData.email);
      await AsyncStorage.setItem('userDetails', JSON.stringify(formData));
      navigation.navigate('VerifyOTP');
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
        <Text style={styles.title}>Register</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={formData.fullName}
          onChangeText={text => handleChange('fullName', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number (Optional)"
          placeholderTextColor="#999"
          value={formData.phone}
          onChangeText={text => handleChange('phone', text)}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleSendOTP}
          disabled={loading}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
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

export default SignupScreen;
