import Logo from '@/assets/icons/logo.svg';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
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
  const handleGoogleLogin = async () => {
    return;
  };

  const handleAppleLogin = async () => {
    return;
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerClassName="items-center justify-center px-4"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center gap-4 mb-12 pt-12">
          <View className="w-[80px] h-[80px] rounded-3xl overflow-hidden shadow-lg">
            <Logo width={80} height={80} />
          </View>

          <Text className="text-slate-900 text-2xl font-bold tracking-tight mt-2">{title}</Text>

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
            className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80 disabled:opacity-50"
          >
            <AntDesign name="google" size={16} color="#4285F4" />
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">
              Continue with Google
            </Text>
          </Pressable>

          {/* Apple Login Button */}
          <Pressable
            onPress={handleAppleLogin}
            className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80 disabled:opacity-50"
          >
            <AntDesign name="apple" size={16} color="#000000" />
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">
              Continue with Apple
            </Text>
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
