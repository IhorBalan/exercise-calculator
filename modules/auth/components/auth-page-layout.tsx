import { useAuth } from '@/modules/auth/context/auth-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthPageLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  linkTo?: 'login' | 'signup';
};

export function AuthPageLayout({
  title,
  description,
  children,
  linkTo = 'signup',
}: AuthPageLayoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // Mock login - replace with actual Google OAuth implementation
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: 'https://via.placeholder.com/150',
      };
      const mockToken = 'mock-google-token-123';
      await login(mockUser, mockToken);
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      // Mock login - replace with actual Apple OAuth implementation
      const mockUser = {
        id: '2',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        image: 'https://via.placeholder.com/150',
      };
      const mockToken = 'mock-apple-token-456';
      await login(mockUser, mockToken);
    } catch (error) {
      console.error('Apple login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerClassName="flex-1 items-center justify-center px-4"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center gap-4 mb-12 pt-20">
          <View className="w-20 h-20 bg-cyan-500 rounded-3xl shadow-lg items-center justify-center">
            <MaterialCommunityIcons name="dumbbell" size={40} color="white" />
          </View>

          <Text className="text-slate-900 text-2xl font-bold tracking-tight">{title}</Text>

          <Text className="text-slate-600 text-base font-normal text-center tracking-tight">
            {description}
          </Text>
        </View>
        {children}
        {/* Divider */}
        <View className="w-full max-w-[354px] flex-row items-center gap-4 mb-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="text-slate-500 text-sm font-normal">OR</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* OAuth Buttons Container */}
        <View className="w-full max-w-[354px] gap-4 mb-12">
          {/* Google Login Button */}
          <Pressable
            onPress={handleGoogleLogin}
            disabled={isLoading}
            className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80 disabled:opacity-50"
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
            onPress={handleAppleLogin}
            disabled={isLoading}
            className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80 disabled:opacity-50"
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

        {/* Sign Up Link */}
        <View className="w-full max-w-[354px] items-center justify-center flex-row gap-2 flex-row mb-6">
          <Text className="text-slate-500 text-sm font-normal text-center tracking-tight">
            {linkTo === 'login' ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <Link href={linkTo === 'login' ? '/login' : '/signup'} asChild>
            <Pressable>
              <Text className="text-blue-500 font-medium">
                {linkTo === 'login' ? 'Log in' : 'Sign up'}
              </Text>
            </Pressable>
          </Link>
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
