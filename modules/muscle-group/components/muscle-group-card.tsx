import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { MuscleGroup } from '../types/muscle-group.types';

export interface MuscleGroupCardProps extends MuscleGroup {
  onPress?: () => void;
  volume: number;
  improvementPercentage: number;
}

export function MuscleGroupCard({
  name,
  emoji,
  color,
  id,
  volume,
  improvementPercentage,
}: MuscleGroupCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/muscle-details',
          params: {
            name,
            id,
          },
        })
      }
      className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center justify-between active:opacity-80"
    >
      <View className="flex-row items-center gap-3 flex-1">
        <View
          className={`w-12 h-12 ${color} dark:bg-gray-800 rounded-xl items-center justify-center`}
        >
          <Text className="text-xl">{emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-accent text-base tracking-tight">{name}</Text>
          <Text className="text-body text-sm tracking-tight">{volume} kg</Text>
        </View>
      </View>
      {improvementPercentage !== 0 && (
        <View>
          <View className="bg-green-50 dark:bg-green-900 px-2.5 py-2 rounded-lg flex-row items-center gap-1">
            <Ionicons
              name={improvementPercentage > 0 ? 'trending-up' : 'trending-down'}
              size={16}
              color="#16a34a"
            />
            <Text className="text-green-600 dark:text-green-400 text-sm tracking-tight">
              {improvementPercentage}%
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}
