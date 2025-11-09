import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
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
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerClassName="flex-1 items-center justify-center px-5"
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo and Header Container */}
        <View className="items-center gap-6 mb-12">
          {/* App Icon Container */}
          <View className="w-20 h-20 bg-cyan-500 rounded-3xl shadow-lg items-center justify-center">
            <MaterialCommunityIcons name="dumbbell" size={40} color="white" />
          </View>

          {/* App Name */}
          <Text className="text-slate-900 text-base font-normal tracking-tight">LiftUp</Text>

          {/* Tagline */}
          <Text className="text-slate-600 text-base font-normal text-center tracking-tight">
            Create your account to get started
          </Text>
        </View>

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
            size="lg"
            className="mt-2"
          >
            {isLoading ? <ActivityIndicator size="small" color="white" /> : 'Create Account'}
          </Button>
        </View>

        {/* Divider */}
        <View className="w-full max-w-[354px] flex-row items-center gap-4 mb-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="text-slate-500 text-sm font-normal">OR</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* OAuth Buttons Container */}
        <View className="w-full max-w-[354px] gap-4 mb-6">
          {/* Google Login Button */}
          <Pressable
            className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#4285F4" />
            ) : (
              <>
                <AntDesign name="google" size={16} color="#4285F4" />
                <Text className="text-neutral-950 text-sm font-medium tracking-tight">
                  Continue with Google
                </Text>
              </>
            )}
          </Pressable>

          {/* Apple Login Button */}
          <Pressable
            className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <>
                <AntDesign name="apple" size={16} color="#000000" />
                <Text className="text-neutral-950 text-sm font-medium tracking-tight">
                  Continue with Apple
                </Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Sign In Link */}
        <View className="w-full max-w-[354px] mb-8">
          <Text className="text-slate-500 text-sm font-normal text-center tracking-tight">
            Already have an account?{' '}
            <Link href="/login" asChild>
              <Pressable>
                <Text className="text-cyan-500 font-medium">Sign in</Text>
              </Pressable>
            </Link>
          </Text>
        </View>

        {/* Terms and Privacy */}
        <View className="w-full max-w-[320px] mb-8">
          <Text className="text-slate-500 text-sm font-normal text-center leading-5 tracking-tight">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
