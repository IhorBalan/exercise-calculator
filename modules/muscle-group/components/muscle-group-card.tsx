import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { MuscleGroupWithProgress } from '../types/muscle-group.types';

export interface MuscleGroupCardProps extends MuscleGroupWithProgress {
  onPress?: () => void;
}

function formatVolume(volume: number): string {
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}k kg`;
  }
  return `${volume} kg`;
}

function formatGrowth(growth: number): string {
  const percentage = Math.round(growth * 100);
  return `${growth >= 0 ? '+' : ''}${percentage}%`;
}

export function MuscleGroupCard({ name, emoji, volume, growth, color, id }: MuscleGroupCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/muscle-details',
          params: {
            name,
            id,
            emoji,
            volume,
            growth,
          },
        })
      }
      className="bg-white p-4 rounded-2xl shadow-sm flex-row items-center justify-between active:opacity-80"
    >
      <View className="flex-row items-center gap-3 flex-1">
        <View className={`w-12 h-12 ${color} rounded-xl items-center justify-center`}>
          <Text className="text-xl">{emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-slate-900 text-base tracking-tight">{name}</Text>
          <Text className="text-slate-500 text-sm tracking-tight">{formatVolume(volume)}</Text>
        </View>
      </View>
      <View className="bg-green-50 px-2.5 py-2 rounded-lg">
        <Text className="text-green-600 text-sm tracking-tight">{formatGrowth(growth)}</Text>
      </View>
    </Pressable>
  );
}
