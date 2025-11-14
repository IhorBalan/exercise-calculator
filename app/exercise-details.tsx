import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/modules/core/components/button';
import { useExerciseByIdQuery } from '@/modules/exercise/hooks/use-exercise-by-id-query';

export default function ExerciseDetailsScreen() {
  const params = useLocalSearchParams();
  const exerciseId = (params.id as string) || '';
  const { data: exercise } = useExerciseByIdQuery(exerciseId);

  if (!exercise) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-4 gap-1">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="w-9 h-9 rounded-xl bg-white items-center shadow-sm justify-center mb-4 active:opacity-80"
            >
              <Ionicons name="arrow-back" size={16} color="#000000" />
            </Pressable>

            <View className="flex-row items-center gap-3 mb-3">
              <Text className="text-slate-900 text-base tracking-tight">{exercise.name}</Text>
            </View>
            <View className="w-10" />
          </View>
        </View>

        <View className="pb-14 gap-6">
          {/* Exercise Image */}
          {exercise.image && (
            <View className="px-4">
              <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <Image
                  source={{ uri: exercise.image }}
                  style={{ width: '100%', height: 240 }}
                  contentFit="cover"
                  transition={200}
                  placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
                />
              </View>
            </View>
          )}
          {/* Exercise Description */}
          <View className="px-4">
            <View className="bg-white p-4 rounded-2xl shadow-sm">
              <Text className="text-slate-900 text-base font-medium tracking-tight mb-2">
                About this exercise
              </Text>
              <Text className="text-slate-600 text-sm tracking-tight leading-5">
                {exercise.description}
              </Text>
              <View className="mt-4 items-start gap-2 flex-row">
                <Button variant="primary" size="sm">
                  Add training
                </Button>
                <Button variant="outline" size="sm">
                  Show video instructions
                </Button>
              </View>
            </View>
          </View>

          <View className="px-4">
            <Text className="text-slate-900 text-base font-medium tracking-tight mb-2">
              Your progress
            </Text>
            <View className="flex-row gap-3 mt-2">
              <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
                <Text className="text-slate-500 text-xs tracking-tight mb-1">Total Volume</Text>
                <Text className="text-slate-800 text-lg font-semibold tracking-tight">1000 kg</Text>
              </View>
              <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
                <Text className="text-slate-500 text-xs tracking-tight mb-1">Best Weight</Text>
                <Text className="text-slate-800 text-lg font-semibold tracking-tight">100kg</Text>
              </View>
              <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
                <Text className="text-slate-500 text-xs tracking-tight mb-1">Sessions</Text>
                <Text className="text-slate-800 text-lg font-semibold tracking-tight">
                  10 sessions
                </Text>
              </View>
            </View>
            <Button variant="secondary" size="md" className="mt-4">
              Show training history
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
