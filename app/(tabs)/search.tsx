import { useExercisesSearchQuery } from '@/modules/exercise/hooks/use-exercises-search-query';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const { colorScheme } = useColorScheme();
  const { data: exercises = [] } = useExercisesSearchQuery('');

  // Theme-aware colors
  const iconColor = colorScheme === 'dark' ? '#9CA3AF' : '#717182';
  const placeholderColor = colorScheme === 'dark' ? '#9CA3AF' : '#717182';
  const inputTextColor = colorScheme === 'dark' ? '#F8FAFC' : '#0F172A';
  const chevronColor = colorScheme === 'dark' ? '#64748B' : '#CBD5E1';
  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-6 gap-1">
          <Text className="text-accent text-xl font-medium tracking-tight">Exercise Library</Text>
          <Text className="text-body text-base tracking-tight">Browse and search exercises</Text>
        </View>

        {/* Search Input */}
        <View className="mx-4">
          <View className="bg-background rounded-2xl gap-3 shadow-sm flex-row items-center px-4 h-14">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              className="flex-1 text-base leading-[16px]"
              placeholder="Search exercises..."
              placeholderTextColor={placeholderColor}
              style={{ color: inputTextColor }}
            />
          </View>
        </View>

        {/* Exercise List */}
        <View className="px-4 mt-6 gap-4 pb-6">
          {exercises.map((exercise, index) => (
            <Pressable
              key={index}
              onPress={() =>
                router.push({
                  pathname: '/exercise-details',
                  params: {
                    id: exercise.id,
                    name: exercise.name,
                  },
                })
              }
              className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center active:opacity-80"
            >
              {/* Icon */}
              <View className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">{exercise.muscleGroup.emoji}</Text>
              </View>

              {/* Content */}
              <View className="flex-1 gap-1">
                {/* Title and Badge Row */}
                <View className="flex-row items-start justify-between">
                  <Text className="text-accent text-base tracking-tight">{exercise.name}</Text>
                  <View
                    className={`${exercise.muscleGroup.color} dark:bg-gray-800 px-2 py-0.5 rounded-lg`}
                  >
                    <Text
                      className={`text-xs text-slate-900 dark:text-slate-100 font-medium tracking-tight`}
                    >
                      {exercise.muscleGroup.name}
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <Text className="text-body text-sm tracking-tight" numberOfLines={1}>
                  {exercise.description}
                </Text>
              </View>

              {/* Chevron */}
              <View className="ml-2 items-center justify-center">
                <Ionicons name="chevron-forward" size={20} color={chevronColor} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
