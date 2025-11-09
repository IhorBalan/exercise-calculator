import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { AuthPageLayout } from '@/modules/auth/components/auth-page-layout';
import { useAuth } from '@/modules/auth/context/auth-context';

export default function SignUpScreen() {
  const { createUserWithEmailAndPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(emailValue)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      setPasswordError('Password is required');
      return false;
    }
    if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignUp = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      setIsLoading(true);
      setEmailError('');
      setPasswordError('');
      await createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error('Sign up error:', error);
      // Set error message from Firebase
      const errorMessage = error?.message || 'Failed to create account. Please try again.';
      if (errorMessage.includes('email') || errorMessage.includes('Email')) {
        setEmailError(errorMessage);
      } else if (errorMessage.includes('password') || errorMessage.includes('Password')) {
        setPasswordError(errorMessage);
      } else {
        setEmailError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout title="Sign Up" description="Create your account to get started" linkTo="login">
      {/* Email/Password Form */}
      <View className="w-full max-w-[354px] gap-4 mb-6">
        <Input
          label="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (emailError) {
              validateEmail(text);
            }
          }}
          onBlur={() => validateEmail(email)}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          variant="light"
          error={emailError}
          leftElement={<Ionicons name="mail-outline" size={20} color="#9CA3AF" />}
          containerClassName="mb-2"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (passwordError) {
              validatePassword(text);
            }
          }}
          onBlur={() => validatePassword(password)}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoComplete="new-password"
          variant="light"
          error={passwordError}
          leftElement={<Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />}
          rightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          }
          containerClassName="mb-2"
        />

        <Button
          onPress={handleSignUp}
          disabled={isLoading}
          fullWidth
          variant="primary"
          size="md"
          className="mt-2"
        >
          {isLoading ? <ActivityIndicator size="small" color="white" /> : 'Create Account'}
        </Button>
      </View>
    </AuthPageLayout>
  );
}
