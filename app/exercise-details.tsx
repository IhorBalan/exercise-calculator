import { BottomFixedContent } from '@/modules/core/components/bottom-fixed-content';
import { Button } from '@/modules/core/components/button';
import { useExerciseByIdQuery } from '@/modules/exercise/hooks/use-exercise-by-id-query';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExerciseDetailsScreen() {
  const params = useLocalSearchParams();
  const exerciseId = (params.id as string) || '';
  const { data: exercise } = useExerciseByIdQuery(exerciseId);
  const insets = useSafeAreaInsets();

  if (!exercise) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={[]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative" style={{ height: 300 + insets.top }}>
          <Image
            source={{ uri: exercise.image }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={200}
            placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
          />

          <View
            className="absolute top-0 left-0 right-0 px-4 pb-6"
            style={{ paddingTop: insets.top + 16 }}
          >
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => router.back()}
                className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm items-center shadow-sm justify-center active:opacity-80"
              >
                <Ionicons name="arrow-back" size={16} color="#000000" />
              </Pressable>
              <View className="flex-1 items-center">
                <Text className="text-white text-base font-semibold tracking-tight drop-shadow-lg">
                  {exercise.name}
                </Text>
              </View>
              <View className="w-9" />
            </View>
          </View>
        </View>

        <View
          className="pb-14 gap-8 bg-white relative"
          style={{
            minHeight: Dimensions.get('window').height - 300 - insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View className="absolute -top-[20px] left-0 w-full h-[20px] bg-white rounded-t-3xl"></View>
          <View className="">
            <View className="px-6">
              <Text className="text-slate-900 text-base font-medium tracking-tight mb-2">
                About this exercise
              </Text>
              <Text className="text-slate-600 text-sm tracking-tight leading-5">
                {exercise.description}
              </Text>
            </View>
          </View>

          <View className="px-6">
            <Text className="text-slate-900 text-base font-medium tracking-tight mb-2">
              Your progress
            </Text>
            <View className="flex-row gap-3 mt-2">
              <View className="flex-1">
                <Text className="text-slate-500 text-xs tracking-tight mb-1">Total Volume</Text>
                <Text className="text-slate-800 text-lg font-semibold tracking-tight">1000 kg</Text>
              </View>
              <View className="w-px h-full bg-slate-200" />
              <View className="flex-1">
                <Text className="text-slate-500 text-xs tracking-tight mb-1">Best Weight</Text>
                <Text className="text-slate-800 text-lg font-semibold tracking-tight">100kg</Text>
              </View>
              <View className="w-px h-full bg-slate-200" />
              <View className="flex-1">
                <Text className="text-slate-500 text-xs tracking-tight mb-1">Sessions</Text>
                <Text className="text-slate-800 text-lg font-semibold tracking-tight">
                  10 sessions
                </Text>
              </View>
            </View>
          </View>
          <View className="px-6">
            <Text className="text-slate-900 text-base font-medium tracking-tight mb-2">
              Training history
            </Text>
            <View className="flex-row gap-3 mt-2"></View>
          </View>
        </View>
      </ScrollView>
      <BottomFixedContent>
        <View className="flex-row gap-3">
          <Button variant="outline" size="md" className="flex-1">
            Show instructions
          </Button>
          <Button variant="primary" size="md" className="flex-1">
            Add Training
          </Button>
        </View>
      </BottomFixedContent>
    </SafeAreaView>
  );
}
