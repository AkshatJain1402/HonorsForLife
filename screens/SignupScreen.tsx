// screens/SignupScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import {useWindowDimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../types/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SignupScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Signup'>;
};

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const {signup, isLoading, error} = useAuth();
  const {height} = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Email validation function
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation function
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignup = async () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!isValid) return;

    await signup(email, password);
  };

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (pass.match(/[A-Z]/)) strength += 1;
    if (pass.match(/[0-9]/)) strength += 1;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 1;
    setPasswordStrength(strength);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {minHeight: height}]}>
      {/* ... rest of the JSX remains the same ... */}

      <Input
        placeholder="Email Address"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError('');
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        leftIcon={<Icon name="email-outline" size={20} color="#666" />}
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <Input
        placeholder="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError('');
          calculatePasswordStrength(text);
        }}
        secureTextEntry={!showPassword}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        }
      />

      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          setPasswordError('');
        }}
        secureTextEntry
        rightIcon={<Icon name="lock-check" size={20} color="#666" />}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      {/* ... rest of the JSX remains the same ... */}
    </KeyboardAvoidingView>
  );
};

const getStrengthColor = (strength: number) => {
  const colors = ['#ff4444', '#ffbb33', '#00C851', '#00C851'];
  return colors[strength - 1] || '#eee';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0066CC',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  passwordStrengthContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 4,
  },
  strengthBar: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  socialLoginContainer: {
    marginVertical: 24,
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    width: 50,
    alignItems: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#0066CC',
    fontWeight: '600',
  },
});

export default SignupScreen;
