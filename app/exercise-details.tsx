import { useExerciseByIdQuery } from '@/modules/exercise/hooks/use-exercise-by-id-query';
import { TrainingHistoryOfExerciseContainer } from '@/modules/training/containers/training-history-of-exercise-container';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const rules = [
  {
    label: '+1 reps/week',
    color: 'bg-green-50 dark:bg-green-900',
    textColor: 'text-green-700 dark:text-green-300',
  },
  {
    label: 'Max 12 reps',
    color: 'bg-blue-50 dark:bg-blue-900',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
  {
    label: '+2.5 kg',
    color: 'bg-purple-50 dark:bg-purple-900',
    textColor: 'text-purple-700 dark:text-purple-300',
  },
];

export default function ExerciseDetailsScreen() {
  const { colorScheme } = useColorScheme();
  const params = useLocalSearchParams();
  const exerciseId = (params.id as string) || '';
  const { data: exercise } = useExerciseByIdQuery(exerciseId);
  const insets = useSafeAreaInsets();

  // Theme-aware colors
  const backIconColor = colorScheme === 'dark' ? '#000000' : '#000000'; // Keep black for visibility on image
  if (!exercise) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={[]}>
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
                className="w-9 h-9 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm items-center shadow-sm justify-center active:opacity-80"
              >
                <Ionicons name="arrow-back" size={16} color={backIconColor} />
              </Pressable>
              <View className="flex-1 items-center">
                {/* <Text className="text-white text-base font-semibold tracking-tight drop-shadow-lg">
                  {exercise.name}
                </Text> */}
              </View>
              <View className="w-9" />
            </View>
          </View>
        </View>

        <View
          className="pb-14 gap-6 bg-background relative"
          style={{
            minHeight: Dimensions.get('window').height - 300 - insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View className="absolute -top-[20px] left-0 w-full h-[20px] bg-background rounded-t-3xl"></View>
          <View className="">
            <View className="px-6">
              <Text className="text-accent text-xl font-medium tracking-tight mb-2">
                {exercise.name}
              </Text>
              <Text className="text-body text-sm tracking-tight leading-5">
                {exercise.description}
              </Text>
            </View>
          </View>
          <View className="px-6">
            <Text className="text-accent text-base font-medium tracking-tight mb-2">
              Your progress
            </Text>
            <View className="flex-row gap-3 mt-4">
              <View className="flex-1">
                <Text className="text-body text-xs tracking-tight mb-1">Total Volume</Text>
                <Text className="text-accent text-lg font-semibold tracking-tight">1000 kg</Text>
              </View>
              <View className="w-px h-full bg-divider" />
              <View className="flex-1">
                <Text className="text-body text-xs tracking-tight mb-1">Best Weight</Text>
                <Text className="text-accent text-lg font-semibold tracking-tight">100kg</Text>
              </View>
              <View className="w-px h-full bg-divider" />
              <View className="flex-1">
                <Text className="text-body text-xs tracking-tight mb-1">Sessions</Text>
                <Text className="text-accent text-lg font-semibold tracking-tight">
                  10 sessions
                </Text>
              </View>
            </View>
          </View>

          <View className="h-px bg-divider w-full" />

          <View className="px-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-accent text-base font-medium tracking-tight">
                Progression Rules
              </Text>
            </View>
            <View className="flex-row gap-3">
              {rules.map((rule, index) => (
                <View key={index} className={`${rule.color} px-4 py-2 rounded-lg`}>
                  <Text className={`${rule.textColor} text-sm font-medium tracking-tight`}>
                    {rule.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="h-px bg-divider w-full" />
          <View className="px-6 pb-24">
            <TrainingHistoryOfExerciseContainer exerciseId={exerciseId} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
