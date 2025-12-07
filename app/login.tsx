import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { Button } from '@/modules/core/components/button';
import { Input } from '@/modules/core/components/input';
import { useToast } from '@/modules/core/components/toast-container';
import { AuthPageLayout } from '@/modules/auth/components/auth-page-layout';
import { useSignInWithEmailAndPassword } from '@/modules/auth/hooks/use-sign-in-with-email-and-password';

export default function LoginScreen() {
  const { colorScheme } = useColorScheme();
  const signInWithEmailAndPasswordMutation = useSignInWithEmailAndPassword();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Theme-aware icon color
  const iconColor = colorScheme === 'dark' ? '#D1D5DB' : '#9CA3AF';

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

  const handleEmailLogin = useCallback(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    signInWithEmailAndPasswordMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log('success');
        },
        onError: (error: any) => {
          console.error('Email login error:', error);

          // Map Firebase auth errors to user-friendly messages
          let errorMessage = 'Invalid email or password. Please try again.';

          if (error?.code) {
            switch (error.code) {
              case 'auth/invalid-email':
                errorMessage = 'Invalid email address. Please check your email and try again.';
                break;
              case 'auth/user-disabled':
                errorMessage = 'This account has been disabled. Please contact support.';
                break;
              case 'auth/user-not-found':
                errorMessage = 'No account found with this email. Please sign up first.';
                break;
              case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
              case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password. Please check your credentials.';
                break;
              case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
              case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection and try again.';
                break;
              default:
                errorMessage = error?.message || 'Invalid email or password. Please try again.';
            }
          } else if (error?.message) {
            errorMessage = error.message;
          }

          showToast(errorMessage, 'error');
        },
      }
    );
  }, [email, password, signInWithEmailAndPasswordMutation]);

  return (
    <AuthPageLayout
      title="Log In"
      description="Track your strength, celebrate your progress"
      linkTo="signup"
    >
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
          leftElement={<Ionicons name="mail-outline" size={20} color={iconColor} />}
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
          autoComplete="password"
          variant="light"
          error={passwordError}
          leftElement={<Ionicons name="lock-closed-outline" size={20} color={iconColor} />}
          rightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={iconColor}
              />
            </Pressable>
          }
          containerClassName="mb-2"
        />

        <Button
          onPress={handleEmailLogin}
          disabled={signInWithEmailAndPasswordMutation.isPending}
          fullWidth
          variant="primary"
          size="md"
          className="mt-2"
        >
          {signInWithEmailAndPasswordMutation.isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            'Sign in with Email'
          )}
        </Button>
      </View>
    </AuthPageLayout>
  );
}
