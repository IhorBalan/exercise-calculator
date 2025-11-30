import { Button } from '@/modules/core/components/button';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const motivationalMessages = [
  {
    subtitle: 'You crushed that workout!',
    message: 'One more step to becoming stronger. Keep pushing forward!',
  },
  {
    subtitle: 'You did it!',
    message: "Every rep counts. You're building something incredible!",
  },
  {
    subtitle: 'You completed your session!',
    message: "Consistency is key. You're on the right track!",
  },
  {
    subtitle: 'Great job today!',
    message: 'Progress happens one workout at a time. Keep going!',
  },
];

export default function WorkoutTimerSummaryScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const completedSessions = params.completedSessions
    ? JSON.parse(params.completedSessions as string)
    : [];
  const totalDuration = params.totalDuration ? Number(params.totalDuration) : 0;

  const randomMessage = useMemo(() => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  }, []);

  const formattedDuration = useMemo(() => {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = totalDuration % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [totalDuration]);

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: '(tabs)' as never }],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-20 pb-6">
          {/* Header */}
          <View className="items-center justify-center mb-8">
            <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-6">
              <Ionicons name="checkmark-circle-outline" size={48} color="white" />
            </View>
            <Text className="text-slate-800 text-xl font-medium tracking-tight text-center mb-4">
              {randomMessage.subtitle}
            </Text>
            <Text className="text-slate-500 text-base font-regular tracking-tight text-center px-4">
              {randomMessage.message}
            </Text>
          </View>

          {/* Summary Stats */}
          <View className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <View className="gap-4">
              <View className="flex-row items-center justify-between pb-4 border-b border-slate-100">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
                    <Ionicons name="time-outline" size={20} color="#3b82f6" />
                  </View>
                  <Text className="text-slate-600 text-base font-regular tracking-tight">
                    Total Time
                  </Text>
                </View>
                <Text className="text-slate-900 text-lg font-medium tracking-tight">
                  {formattedDuration}
                </Text>
              </View>

              <View className="flex-row items-center justify-between pb-4 border-b border-slate-100">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center">
                    <Ionicons name="repeat-outline" size={20} color="#a855f7" />
                  </View>
                  <Text className="text-slate-600 text-base font-regular tracking-tight">
                    Sessions Completed
                  </Text>
                </View>
                <Text className="text-slate-900 text-lg font-medium tracking-tight">
                  {completedSessions.length}
                </Text>
              </View>

              <View className="flex-row items-center justify-between pb-4 border-b border-slate-100">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-green-50 rounded-xl items-center justify-center">
                    <Ionicons name="barbell-outline" size={20} color="#22c55e" />
                  </View>
                  <Text className="text-slate-600 text-base font-regular tracking-tight">
                    Weight
                  </Text>
                </View>
                <Text className="text-slate-900 text-lg font-medium tracking-tight">100 kg</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-amber-50 rounded-xl items-center justify-center">
                    <Ionicons name="trending-up-outline" size={20} color="#f59e0b" />
                  </View>
                  <Text className="text-slate-600 text-base font-regular tracking-tight">
                    Volume
                  </Text>
                </View>
                <Text className="text-slate-900 text-lg font-medium tracking-tight">100 kg</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <Button
            variant="primary"
            size="md"
            fullWidth
            onPress={handleGoHome}
            className="mb-6 mt-6"
          >
            Done
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
