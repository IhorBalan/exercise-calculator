import { TrainingCard } from '@/modules/training/components/training-card';
import { AddTrainingOptionsModal } from '@/modules/training/containers/add-training-options-modal';
import { useTrainingListQuery } from '@/modules/training/hooks/use-training-list-query';
import { Ionicons } from '@expo/vector-icons';
import { endOfDay, isSameDay, startOfDay } from 'date-fns';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

const getWeekDays = () => {
  const today = new Date();
  const days: { date: Date; dateString: string; dayName: string; dayNumber: number }[] = [];

  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();

    days.push({ date, dateString, dayName, dayNumber });
  }

  return days;
};

export default function TrainingsScreen() {
  const { colorScheme } = useColorScheme();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isAddOptionsModalOpen, setIsAddOptionsModalOpen] = useState(false);

  const weekDays = useMemo(() => getWeekDays(), []);

  // Theme-aware icon color for empty state
  const emptyIconColor = colorScheme === 'dark' ? '#64748B' : '#CBD5E1';
  // api
  const { data: trainings = [] } = useTrainingListQuery({
    startDate: startOfDay(selectedDate).toISOString(),
    endDate: endOfDay(selectedDate).toISOString(),
  });

  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-6 gap-1">
          <Text className="text-accent text-xl font-medium tracking-tight">Trainings</Text>
          <Text className="text-body text-base tracking-tight">
            Your workout history and progress
          </Text>
        </View>

        {/* Calendar - 7 Days Vertical */}
        <View className="px-4 mb-6">
          <View className="bg-background rounded-2xl shadow-sm p-4">
            <View className="gap-2 flex-row">
              {weekDays.map(day => {
                const isSelected = isSameDay(new Date(selectedDate), day.date);

                return (
                  <Pressable
                    key={day.dateString}
                    onPress={() => setSelectedDate(day.dateString)}
                    className={`flex-row flex-1 items-center shadow-sm justify-between py-3 rounded-xl ${
                      isSelected ? 'bg-primary shadow-lg' : 'bg-transparent'
                    } active:opacity-80`}
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="w-12 items-center">
                        <Text
                          className={`text-xs font-medium tracking-tight ${isSelected ? 'text-white' : 'text-body'}`}
                        >
                          {day.dayName}
                        </Text>
                        <Text
                          className={`text-lg font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-accent'}`}
                        >
                          {day.dayNumber}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Training List */}
        <View className="px-4 pb-6 gap-3">
          {trainings.length > 0 ? (
            trainings
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((training, index) => <TrainingCard key={index} training={training} />)
          ) : (
            <View className=" p-8 rounded-2xl items-center">
              <Ionicons name="fitness-outline" size={48} color={emptyIconColor} />
              <Text className="text-body text-base font-medium tracking-tight mt-4">
                No trainings on this day
              </Text>
              <Text className="text-body opacity-70 text-sm tracking-tight mt-1">
                Start tracking your workouts to see them here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => setIsAddOptionsModalOpen(true)}
        className="absolute bottom-10 right-4 w-16 h-16 bg-primary rounded-full shadow-xl items-center justify-center active:opacity-80"
      >
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
      <AddTrainingOptionsModal
        isOpen={isAddOptionsModalOpen}
        onClose={() => setIsAddOptionsModalOpen(false)}
      />
    </SafeAreaView>
  );
}
