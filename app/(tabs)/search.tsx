import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample exercise data organized by muscle group
const exercises = [
  // Chest exercises
  {
    name: 'Bench Press',
    description: 'Compound pressing movement for chest',
    muscleGroup: 'Chest',
    emoji: '💪',
    badgeColor: 'bg-blue-100',
    badgeTextColor: 'text-blue-700',
  },
  {
    name: 'Incline Press',
    description: 'Upper chest development',
    muscleGroup: 'Chest',
    emoji: '💪',
    badgeColor: 'bg-blue-100',
    badgeTextColor: 'text-blue-700',
  },
  {
    name: 'Dumbbell Fly',
    description: 'Chest isolation exercise',
    muscleGroup: 'Chest',
    emoji: '💪',
    badgeColor: 'bg-blue-100',
    badgeTextColor: 'text-blue-700',
  },
  // Back exercises
  {
    name: 'Deadlift',
    description: 'Full body compound movement',
    muscleGroup: 'Back',
    emoji: '🏋️',
    badgeColor: 'bg-green-100',
    badgeTextColor: 'text-green-700',
  },
  {
    name: 'Pull-ups',
    description: 'Bodyweight back exercise',
    muscleGroup: 'Back',
    emoji: '🏋️',
    badgeColor: 'bg-green-100',
    badgeTextColor: 'text-green-700',
  },
  {
    name: 'Barbell Row',
    description: 'Back thickness builder',
    muscleGroup: 'Back',
    emoji: '🏋️',
    badgeColor: 'bg-green-100',
    badgeTextColor: 'text-green-700',
  },
  {
    name: 'Lat Pulldown',
    description: 'Lat width development',
    muscleGroup: 'Back',
    emoji: '🏋️',
    badgeColor: 'bg-green-100',
    badgeTextColor: 'text-green-700',
  },
  // Shoulder exercises
  {
    name: 'Overhead Press',
    description: 'Shoulder compound movement',
    muscleGroup: 'Shoulders',
    emoji: '🎯',
    badgeColor: 'bg-purple-100',
    badgeTextColor: 'text-purple-700',
  },
  {
    name: 'Lateral Raise',
    description: 'Side delt isolation',
    muscleGroup: 'Shoulders',
    emoji: '🎯',
    badgeColor: 'bg-purple-100',
    badgeTextColor: 'text-purple-700',
  },
  // Leg exercises
  {
    name: 'Squat',
    description: 'King of leg exercises',
    muscleGroup: 'Legs',
    emoji: '🦵',
    badgeColor: 'bg-orange-100',
    badgeTextColor: 'text-orange-700',
  },
  {
    name: 'Lunges',
    description: 'Unilateral leg exercise',
    muscleGroup: 'Legs',
    emoji: '🦵',
    badgeColor: 'bg-orange-100',
    badgeTextColor: 'text-orange-700',
  },
  {
    name: 'Leg Curl',
    description: 'Hamstring isolation',
    muscleGroup: 'Legs',
    emoji: '🦵',
    badgeColor: 'bg-orange-100',
    badgeTextColor: 'text-orange-700',
  },
  // Arm exercises
  {
    name: 'Tricep Dips',
    description: 'Tricep compound movement',
    muscleGroup: 'Arms',
    emoji: '💪',
    badgeColor: 'bg-pink-100',
    badgeTextColor: 'text-pink-700',
  },
  {
    name: 'Hammer Curl',
    description: 'Bicep and forearm exercise',
    muscleGroup: 'Arms',
    emoji: '💪',
    badgeColor: 'bg-pink-100',
    badgeTextColor: 'text-pink-700',
  },
  // Core exercises
  {
    name: 'Plank',
    description: 'Core stabilization',
    muscleGroup: 'Core',
    emoji: '⭐',
    badgeColor: 'bg-cyan-100',
    badgeTextColor: 'text-cyan-700',
  },
  {
    name: 'Crunches',
    description: 'Abdominal exercise',
    muscleGroup: 'Core',
    emoji: '⭐',
    badgeColor: 'bg-cyan-100',
    badgeTextColor: 'text-cyan-700',
  },
];

export default function SearchScreen() {
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
                <Text className="text-xl">{exercise.emoji}</Text>
              </View>

              {/* Content */}
              <View className="flex-1 gap-1">
                {/* Title and Badge Row */}
                <View className="flex-row items-start justify-between">
                  <Text className="text-slate-900 text-base tracking-tight">{exercise.name}</Text>
                  <View className={`${exercise.badgeColor} px-2 py-0.5 rounded-lg`}>
                    <Text
                      className={`${exercise.badgeTextColor} text-xs font-medium tracking-tight`}
                    >
                      {exercise.muscleGroup}
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <Text className="text-slate-500 text-sm tracking-tight">
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
