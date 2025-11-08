import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MuscleGroupListContainer } from '@/modules/muscle-group/containers/muscle-group-list-container';

// Sample data for the week
const weeklyData = [
  { day: 'Mon', value: 65, percentage: 0.65 },
  { day: 'Tue', value: 80, percentage: 0.8 },
  { day: 'Wed', value: 55, percentage: 0.55 },
  { day: 'Thu', value: 95, percentage: 0.95 },
  { day: 'Fri', value: 75, percentage: 0.75 },
  { day: 'Sat', value: 0, percentage: 0 },
  { day: 'Sun', value: 0, percentage: 0 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-1 gap-1">
          <Text className="text-slate-900 text-xl font-medium tracking-tight">Welcome back!</Text>
          <Text className="text-slate-600 text-base tracking-tight">
            Here&apos;s your progress this week
          </Text>
        </View>

        {/* Total Volume Card */}
        <View className="mx-4 mt-3 p-6 bg-blue-500 rounded-3xl shadow-lg">
          <View className="flex-row justify-between items-start">
            <View className="gap-1">
              <Text className="text-blue-100 text-base tracking-tight">Total Volume</Text>
              <Text className="text-white text-2xl font-medium">25.1k kg</Text>
            </View>
            <View className="bg-white/20 px-3 py-1.5 rounded-2xl flex-row items-center gap-1">
              <Ionicons name="trending-up" size={16} color="white" />
              <Text className="text-white text-base tracking-tight">+7.3%</Text>
            </View>
          </View>
          <Text className="text-blue-100 text-sm mt-5 tracking-tight">vs last week</Text>
        </View>

        {/* Weekly Activity Card */}
        <View className="mx-4 mt-4 p-6 bg-white rounded-3xl shadow-sm">
          <Text className="text-slate-900 text-lg font-medium tracking-tight mb-5">
            Weekly Activity
          </Text>

          {/* Bar Chart */}
          <View className="flex-row items-end justify-between h-28 mb-3">
            {weeklyData.map((item, index) => (
              <View key={index} className="flex-1 items-center justify-end h-full gap-2">
                <View className="flex-1 justify-end w-full items-center">
                  {item.value > 0 && (
                    <View
                      className="w-8 bg-blue-500 rounded-t-lg"
                      style={{ height: `${item.percentage * 100}%` }}
                    />
                  )}
                </View>
                <Text className="text-slate-400 text-xs">{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Muscle Groups Section */}
        <MuscleGroupListContainer />

        {/* Bottom spacing for FAB */}
        <View className="h-24" />
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        onPress={() => router.push('/add-workout')}
        className="absolute bottom-20 right-4 w-16 h-16 bg-blue-500 rounded-full shadow-xl items-center justify-center active:opacity-80"
      >
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
