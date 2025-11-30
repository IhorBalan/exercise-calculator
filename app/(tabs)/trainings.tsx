import { TrainingCard } from '@/modules/training/components/training-card';
import { AddTrainingOptionsModal } from '@/modules/training/containers/add-training-options-modal';
import { useTrainingListQuery } from '@/modules/training/hooks/use-training-list-query';
import { Ionicons } from '@expo/vector-icons';
import { endOfDay, startOfDay } from 'date-fns';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getWeekDays = () => {
  const today = new Date();
  const days: { date: Date; dateString: string; dayName: string; dayNumber: number }[] = [];

  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();

    days.push({ date, dateString, dayName, dayNumber });
  }

  return days;
};

export default function TrainingsScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isAddOptionsModalOpen, setIsAddOptionsModalOpen] = useState(false);

  const weekDays = useMemo(() => getWeekDays(), []);
  // api
  const { data: trainings = [] } = useTrainingListQuery({
    startDate: startOfDay(selectedDate).toISOString(),
    endDate: endOfDay(selectedDate).toISOString(),
  });

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-6 gap-1">
          <Text className="text-slate-900 text-xl font-medium tracking-tight">Trainings</Text>
          <Text className="text-slate-600 text-base tracking-tight">
            Your workout history and progress
          </Text>
        </View>

        {/* Calendar - 7 Days Vertical */}
        <View className="px-4 mb-6">
          <View className="bg-white rounded-2xl shadow-sm p-4">
            <View className="gap-2 flex-row">
              {weekDays.map(day => {
                const isSelected = selectedDate === day.dateString;

                return (
                  <Pressable
                    key={day.dateString}
                    onPress={() => setSelectedDate(day.dateString)}
                    className={`flex-row flex-1 items-center shadow-sm justify-between py-3 rounded-xl ${
                      isSelected ? 'bg-blue-500 shadow-lg' : 'bg-transparent'
                    } active:opacity-80`}
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="w-12 items-center">
                        <Text
                          className={`text-xs font-medium tracking-tight ${isSelected ? 'text-white' : 'text-neutral-500'}`}
                        >
                          {day.dayName}
                        </Text>
                        <Text
                          className={`text-lg font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}
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
            trainings.map(training => <TrainingCard key={training.id} training={training} />)
          ) : (
            <View className=" p-8 rounded-2xl items-center">
              <Ionicons name="fitness-outline" size={48} color="#cbd5e1" />
              <Text className="text-slate-500 text-base font-medium tracking-tight mt-4">
                No trainings on this day
              </Text>
              <Text className="text-slate-400 text-sm tracking-tight mt-1">
                Start tracking your workouts to see them here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => setIsAddOptionsModalOpen(true)}
        className="absolute bottom-10 right-4 w-16 h-16 bg-blue-500 rounded-full shadow-xl items-center justify-center active:opacity-80"
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
