import { useExercisesSearchQuery } from '@/modules/exercise/hooks/use-exercises-search-query';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const { data: exercises = [] } = useExercisesSearchQuery('');
  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-6 gap-1">
          <Text className="text-slate-900 text-xl font-medium tracking-tight">
            Exercise Library
          </Text>
          <Text className="text-slate-600 text-base tracking-tight">
            Browse and search exercises
          </Text>
        </View>

        {/* Search Input */}
        <View className="mx-4">
          <View className="bg-white rounded-2xl gap-3 shadow-sm flex-row items-center px-4 h-14">
            <Ionicons name="search" size={20} color="#717182" />
            <TextInput
              className="flex-1 text-base leading-[16px] text-slate-900"
              placeholder="Search exercises..."
              placeholderTextColor="#717182"
            />
          </View>
        </View>

        {/* Exercise List */}
        <View className="px-4 mt-6 gap-4 pb-6">
          {exercises.map((exercise, index) => (
            <View key={index} className="bg-white p-4 rounded-2xl shadow-sm flex-row items-start">
              {/* Icon */}
              <View className="w-12 h-12 bg-slate-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">{exercise.muscleGroup.emoji}</Text>
              </View>

              {/* Content */}
              <View className="flex-1 gap-1">
                {/* Title and Badge Row */}
                <View className="flex-row items-start justify-between">
                  <Text className="text-slate-900 text-base tracking-tight">{exercise.name}</Text>
                  <View className={`${exercise.muscleGroup.color} px-2 py-0.5 rounded-lg`}>
                    <Text className={`text-xs text-slate-900 font-medium tracking-tight`}>
                      {exercise.muscleGroup.name}
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <Text className="text-slate-500 text-sm tracking-tight" numberOfLines={1}>
                  {exercise.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
