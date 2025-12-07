import { Button } from '@/modules/core/components/button';
import { MUSCLE_GROUP_LIST_QUERY_KEY } from '@/modules/muscle-group/hooks/use-muscle-group-list-query';
import { useTrainingByIdQuery } from '@/modules/training/hooks/use-training-by-id-query';
import { TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY } from '@/modules/training/hooks/use-training-history-of-exercise-query';
import { TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY } from '@/modules/training/hooks/use-training-history-of-muscle-group-query';
import { TRAINING_LIST_QUERY_KEY } from '@/modules/training/hooks/use-training-list-query';
import { TRAINING_RECORDS_QUERY_KEY } from '@/modules/training/hooks/use-training-records-query';
import { WEEKLY_VOLUME_QUERY_KEY } from '@/modules/volume/hooks/use-weekly-volume-query';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { queryClient } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
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
  const { colorScheme } = useColorScheme();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const trainingId = params.trainingId as string;

  const { data: training } = useTrainingByIdQuery(trainingId || '6E6CaZKTzTKFXYKF5Bnh');

  const stats = useMemo(() => {
    if (!training) return [];

    return [
      {
        label: 'Volume',
        value: getTrainingVolume(training) + ' kg',
        icon: 'barbell-outline',
      },
      {
        label: 'Completed Sessions',
        value: training.sessions?.length || 0,
        icon: 'time-outline',
      },
      {
        label: 'Total Reps',
        value: training.sessions?.reduce((acc, session) => acc + session.reps, 0) || 0,
        icon: 'repeat-outline',
      },
      {
        label: 'Avg Weight per Rep',
        value:
          (getTrainingVolume(training) /
            (training.sessions?.reduce((acc, session) => acc + session.reps, 0) || 1) || 0) + ' kg',
        icon: 'trending-up-outline',
      },
    ];
  }, [training]);

  const randomMessage = useMemo(() => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  }, []);

  const handleGoHome = () => {
    queryClient.invalidateQueries({ queryKey: [WEEKLY_VOLUME_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [TRAINING_LIST_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [MUSCLE_GROUP_LIST_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [TRAINING_RECORDS_QUERY_KEY] });

    navigation.reset({
      index: 0,
      routes: [{ name: '(tabs)' as never }],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={['top', 'bottom']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-20 pb-6">
          {/* Header */}
          <View className="items-center justify-center mb-8">
            <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-6">
              <Ionicons name="checkmark-circle-outline" size={48} color="white" />
            </View>
            <Text className="text-accent text-xl font-medium tracking-tight text-center mb-4">
              {randomMessage.subtitle}
            </Text>
            <Text className="text-body text-base font-regular tracking-tight text-center px-4">
              {randomMessage.message}
            </Text>
          </View>

          {/* Summary Stats */}
          <View className="bg-background rounded-2xl shadow-sm p-6 mb-6">
            <View className="gap-4">
              {stats.map((stat, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between pb-4 border-b border-divider"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-blue-50 dark:bg-blue-900 rounded-xl items-center justify-center">
                      <Ionicons name={stat.icon as any} size={20} color="#3b82f6" />
                    </View>
                    <Text className="text-body text-base font-regular tracking-tight">
                      {stat.label}
                    </Text>
                  </View>
                  <Text className="text-accent text-lg font-medium tracking-tight">
                    {stat.value}
                  </Text>
                </View>
              ))}
            </View>
            <Button variant="primary" size="md" fullWidth onPress={handleGoHome} className="mt-10">
              Done
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
