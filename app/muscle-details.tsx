import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PersonalRecordsContainer } from '@/modules/muscle-group/containers/personal-records-container';
import { WorkoutHistoryContainer } from '@/modules/training/containers/training-history-of-muscle-group-container';
import { WeeklyMuscleVolumeChart } from '@/modules/volume/containers/weekly-muscle-volume-chart';

export default function MuscleDetailsScreen() {
  const { colorScheme } = useColorScheme();
  const params = useLocalSearchParams();
  const muscleName = (params.name as string) || 'Chest';
  const muscleGroupId = (params.id as string) || '';

  // Theme-aware colors
  const backIconColor = colorScheme === 'dark' ? '#F8FAFC' : '#000000';

  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-4 gap-1 mb-4">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="w-9 h-9 rounded-xl bg-background items-center shadow-sm justify-center mb-4 active:opacity-80"
            >
              <Ionicons name="arrow-back" size={16} color={backIconColor} />
            </Pressable>

            <View className="flex-row items-center gap-3 mb-3">
              <Text className="text-accent text-base tracking-tight">{muscleName}</Text>
            </View>
            <View className="w-10" />
          </View>

          <Text className="text-body text-center text-base tracking-tight">
            Track your progress and personal records
          </Text>
        </View>

        <View className="pb-14 gap-8">
          <WeeklyMuscleVolumeChart muscleGroupId={muscleGroupId} />
          <PersonalRecordsContainer muscleGroupId={muscleGroupId} />
          <WorkoutHistoryContainer muscleGroupId={muscleGroupId} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
