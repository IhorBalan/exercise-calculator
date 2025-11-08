import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export default function LoginScreen() {
  const handleGoogleLogin = () => {
    console.log('Google login pressed');
  };

  const handleAppleLogin = () => {
    console.log('Apple login pressed');
  };

  return (
    <View className="flex-1 items-center justify-center px-5 bg-blue-50">
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
          Track your strength, celebrate your progress
        </Text>
      </View>

      {/* Buttons Container */}
      <View className="w-full max-w-[354px] gap-4 mb-12">
        {/* Google Login Button */}
        <Pressable
          onPress={handleGoogleLogin}
          className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80"
        >
          <AntDesign name="google" size={16} color="#4285F4" />
          <Text className="text-neutral-950 text-sm font-medium tracking-tight">
            Continue with Google
          </Text>
        </Pressable>

        {/* Apple Login Button */}
        <Pressable
          onPress={handleAppleLogin}
          className="bg-white border border-gray-200 rounded-2xl h-14 flex-row items-center justify-center gap-3 active:opacity-80"
        >
          <AntDesign name="apple" size={16} color="#000000" />
          <Text className="text-neutral-950 text-sm font-medium tracking-tight">
            Continue with Apple
          </Text>
        </Pressable>
      </View>

      {/* Terms and Privacy */}
      <View className="w-full max-w-[320px]">
        <Text className="text-slate-500 text-sm font-normal text-center leading-5 tracking-tight">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
