import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VolumeChart } from '@/modules/muscle-group/components/volume-chart';
import { PersonalRecordsContainer } from '@/modules/muscle-group/containers/personal-records-container';
import { AddWorkoutModal } from '@/modules/workout/containers/add-workout-modal';
import { WorkoutHistoryContainer } from '@/modules/workout/containers/workout-history-container';

export default function MuscleDetailsScreen() {
  const params = useLocalSearchParams();
  const muscleName = (params.name as string) || 'Chest';
  const volume = (params.volume as string) || '4.2k kg';
  const growth = (params.growth as string) || '+31.3%';
  const muscleGroupId = (params.id as string) || '';
  console.log('muscleGroupId', muscleGroupId);
  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-4 gap-1 mb-4">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="w-9 h-9 rounded-xl bg-white items-center shadow-sm justify-center mb-4 active:opacity-80"
            >
              <Ionicons name="arrow-back" size={16} color="#000000" />
            </Pressable>

            <View className="flex-row items-center gap-3 mb-3">
              <Text className="text-slate-900 text-base tracking-tight">{muscleName}</Text>
            </View>
            <View className="w-10" />
          </View>

          <Text className="text-slate-600 text-center text-base tracking-tight">
            Track your progress and personal records
          </Text>
        </View>

        <View className="pb-14 gap-8">
          {/* Volume Chart Card */}
          <VolumeChart volume={volume} growth={growth} chartData={[]} />

          {/* Personal Records Section */}
          <PersonalRecordsContainer muscleGroupId={muscleGroupId} />

          {/* Workout History Section */}
          <WorkoutHistoryContainer muscleGroupId={muscleGroupId} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-10 bg-white shadow-sm border-t border-gray-100">
        <Pressable
          onPress={() => setIsAddWorkoutOpen(true)}
          className="w-full bg-blue-500 rounded-2xl h-14 items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-base font-medium tracking-tight">Add Workout</Text>
        </Pressable>
      </View>

      {/* Add Workout Modal */}
      <AddWorkoutModal isOpen={isAddWorkoutOpen} onClose={() => setIsAddWorkoutOpen(false)} />
    </SafeAreaView>
  );
}
