import { useExercisesSearchQuery } from '@/modules/exercise/hooks/use-exercises-search-query';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useExercisesSearchQuery(searchQuery, 20);

  // Flatten all pages into a single array
  const exercises = useMemo(() => {
    return data?.pages.flatMap(page => page.exercises) ?? [];
  }, [data]);

  // Theme-aware colors
  const iconColor = colorScheme === 'dark' ? '#9CA3AF' : '#717182';
  const placeholderColor = colorScheme === 'dark' ? '#9CA3AF' : '#717182';
  const inputTextColor = colorScheme === 'dark' ? '#F8FAFC' : '#0F172A';
  const chevronColor = colorScheme === 'dark' ? '#64748B' : '#CBD5E1';

  const handleExercisePress = useCallback((exerciseId: string, exerciseName: string) => {
    router.push({
      pathname: '/exercise-details',
      params: {
        id: exerciseId,
        name: exerciseName,
      },
    });
  }, []);

  const renderExerciseItem = useCallback(
    ({ item: exercise }: { item: (typeof exercises)[0] }) => (
      <Pressable
        onPress={() => handleExercisePress(exercise.id, exercise.name)}
        className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center active:opacity-80 mb-4"
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
    ),
    [chevronColor, handleExercisePress]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color={iconColor} />
      </View>
    );
  }, [isFetchingNextPage, iconColor]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return (
      <View className="flex-1 items-center justify-center px-4 py-12">
        <View className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mb-4">
          <Ionicons name="search-outline" size={32} color={iconColor} />
        </View>
        <Text className="text-accent text-base font-medium tracking-tight mb-1">
          {searchQuery.trim() ? 'No exercises found' : 'No exercises available'}
        </Text>
        <Text className="text-body text-sm max-w-[250px] text-center tracking-tight">
          {searchQuery.trim()
            ? `Try searching with a different term`
            : 'Exercises will appear here once they are added'}
        </Text>
      </View>
    );
  }, [isLoading, searchQuery, iconColor]);

  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={['top']}>
      <View className="flex-1">
        {/* Fixed Header */}
        <View className="px-4 pt-8 pb-6 gap-1">
          <Text className="text-accent text-xl font-medium tracking-tight">Exercise Library</Text>
          <Text className="text-body text-base tracking-tight">Browse and search exercises</Text>
        </View>

        {/* Fixed Search Input */}
        <View className="mx-4 mb-4">
          <View className="bg-background rounded-2xl gap-3 shadow-sm flex-row items-center px-4 h-14">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              className="flex-1 text-base leading-[16px]"
              placeholder="Search exercises..."
              placeholderTextColor={placeholderColor}
              style={{ color: inputTextColor }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Scrollable Exercise List */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={iconColor} />
          </View>
        ) : (
          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={item => item.id}
            contentContainerStyle={
              exercises.length === 0
                ? { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 24 }
                : { paddingHorizontal: 16, paddingBottom: 24 }
            }
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
