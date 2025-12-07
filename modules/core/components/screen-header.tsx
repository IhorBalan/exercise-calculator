import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  className?: string;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightAction,
  className = '',
}: ScreenHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const { colorScheme } = useColorScheme();

  // Theme-aware colors
  const backIconColor = colorScheme === 'dark' ? '#F8FAFC' : '#000000';

  return (
    <View className={`px-4 pt-6 pb-4 ${className}`}>
      <View className="flex-row items-center justify-between mb-4">
        <Pressable
          onPress={handleBack}
          className="w-10 h-10 rounded-xl bg-background items-center shadow-sm justify-center active:opacity-80"
        >
          <Ionicons name="arrow-back" size={18} color={backIconColor} />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-accent text-xl font-semibold tracking-tight">{title}</Text>
        </View>
        {rightAction ? <>{rightAction}</> : <View className="w-10" />}
      </View>
      {subtitle && (
        <Text className="text-body text-sm text-center tracking-tight px-4">{subtitle}</Text>
      )}
    </View>
  );
}
