import { AddTrainingOptionsModal } from '@/modules/training/containers/add-training-options-modal';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mocked training data
const mockTrainings = [
  {
    id: '1',
    date: '2024-01-15',
    exerciseName: 'Bench Press',
    muscleGroup: 'Chest',
    sets: 4,
    reps: 8,
    weight: 80,
    volume: 2560, // sets * reps * weight
  },
  {
    id: '2',
    date: '2024-01-14',
    exerciseName: 'Squat',
    muscleGroup: 'Legs',
    sets: 5,
    reps: 5,
    weight: 120,
    volume: 3000,
  },
  {
    id: '3',
    date: '2024-01-13',
    exerciseName: 'Deadlift',
    muscleGroup: 'Back',
    sets: 3,
    reps: 6,
    weight: 140,
    volume: 2520,
  },
  {
    id: '4',
    date: '2024-01-12',
    exerciseName: 'Overhead Press',
    muscleGroup: 'Shoulders',
    sets: 4,
    reps: 6,
    weight: 50,
    volume: 1200,
  },
  {
    id: '5',
    date: '2024-01-11',
    exerciseName: 'Barbell Row',
    muscleGroup: 'Back',
    sets: 4,
    reps: 8,
    weight: 70,
    volume: 2240,
  },
  {
    id: '6',
    date: '2024-01-10',
    exerciseName: 'Pull-ups',
    muscleGroup: 'Back',
    sets: 3,
    reps: 10,
    weight: 75, // bodyweight + added weight
    volume: 2250,
  },
  {
    id: '7',
    date: '2024-01-09',
    exerciseName: 'Leg Press',
    muscleGroup: 'Legs',
    sets: 4,
    reps: 12,
    weight: 180,
    volume: 8640,
  },
  {
    id: '8',
    date: '2024-01-08',
    exerciseName: 'Dumbbell Curl',
    muscleGroup: 'Arms',
    sets: 3,
    reps: 12,
    weight: 15,
    volume: 540,
  },
];

const getMuscleGroupColor = (muscleGroup: string) => {
  const colors: Record<string, { bg: string; icon: string }> = {
    Chest: { bg: 'bg-red-50', icon: '#ef4444' },
    Back: { bg: 'bg-blue-50', icon: '#3b82f6' },
    Legs: { bg: 'bg-purple-50', icon: '#a855f7' },
    Shoulders: { bg: 'bg-orange-50', icon: '#f97316' },
    Arms: { bg: 'bg-pink-50', icon: '#ec4899' },
  };
  return colors[muscleGroup] || { bg: 'bg-slate-50', icon: '#64748b' };
};

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const weekDays = useMemo(() => getWeekDays(), []);
  const [isAddOptionsModalOpen, setIsAddOptionsModalOpen] = useState(false);

  const groupedTrainings = useMemo(() => {
    const groups: Record<string, typeof mockTrainings> = {};
    mockTrainings.forEach(training => {
      const dateKey = training.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(training);
    });
    return groups;
  }, []);

  // Get trainings for selected date
  const selectedDateTrainings = useMemo(() => {
    if (!selectedDate) return [];
    return groupedTrainings[selectedDate] || [];
  }, [selectedDate, groupedTrainings]);

  const getDayVolume = (dateString: string) => {
    const trainings = groupedTrainings[dateString];
    if (!trainings) return 0;
    return trainings.reduce((sum, t) => sum + t.volume, 0);
  };

  const hasWorkout = (dateString: string) => {
    return !!groupedTrainings[dateString] && groupedTrainings[dateString].length > 0;
  };

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
                const dayVolume = getDayVolume(day.dateString);
                const workoutExists = hasWorkout(day.dateString);
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

                      {/* Workout Indicator */}
                      <View className="flex-1">
                        {workoutExists ? (
                          <View className="flex-row items-center gap-2">
                            <View className="w-2 h-2 bg-blue-500 rounded-full" />
                            <Text className="text-slate-900 text-sm font-medium tracking-tight">
                              {groupedTrainings[day.dateString]?.length || 0} workout
                              {(groupedTrainings[day.dateString]?.length || 0) !== 1 ? 's' : ''}
                            </Text>
                          </View>
                        ) : (
                          <Text className="text-slate-400 text-sm tracking-tight">No workouts</Text>
                        )}
                      </View>

                      {/* Volume */}
                      {workoutExists && (
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="barbell-outline" size={14} color="#64748b" />
                          <Text className="text-slate-600 text-sm font-medium tracking-tight">
                            {dayVolume.toLocaleString()} kg
                          </Text>
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Training List */}
        <View className="px-4 pb-6">
          {selectedDate ? (
            selectedDateTrainings.length > 0 ? (
              <View className="gap-3">
                {selectedDateTrainings.map(training => {
                  const muscleGroupColor = getMuscleGroupColor(training.muscleGroup);

                  return (
                    <View
                      key={training.id}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100"
                    >
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1">
                          <Text className="text-slate-900 text-base font-medium tracking-tight mb-1">
                            {training.exerciseName}
                          </Text>
                          <View className="flex-row items-center gap-2">
                            <View
                              className={`px-2 py-1 ${muscleGroupColor.bg} rounded-lg flex-row items-center gap-1`}
                            >
                              <Ionicons
                                name="fitness-outline"
                                size={12}
                                color={muscleGroupColor.icon}
                              />
                              <Text
                                className="text-xs font-medium tracking-tight"
                                style={{ color: muscleGroupColor.icon }}
                              >
                                {training.muscleGroup}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      {/* Training Details */}
                      <View className="flex-row items-center justify-between pt-3 border-t border-slate-100">
                        <View className="flex-row items-center gap-4">
                          <View className="flex-row items-center gap-1">
                            <Ionicons name="repeat-outline" size={16} color="#64748b" />
                            <Text className="text-slate-600 text-sm tracking-tight">
                              {training.sets} sets
                            </Text>
                          </View>
                          <View className="flex-row items-center gap-1">
                            <Ionicons name="flash-outline" size={16} color="#64748b" />
                            <Text className="text-slate-600 text-sm tracking-tight">
                              {training.reps} reps
                            </Text>
                          </View>
                          <View className="flex-row items-center gap-1">
                            <Ionicons name="barbell-outline" size={16} color="#64748b" />
                            <Text className="text-slate-600 text-sm tracking-tight">
                              {training.weight} kg
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Text className="text-slate-900 text-sm font-medium tracking-tight">
                            {training.volume.toLocaleString()} kg
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View className="bg-white p-8 rounded-2xl shadow-sm items-center">
                <Ionicons name="fitness-outline" size={48} color="#cbd5e1" />
                <Text className="text-slate-500 text-base font-medium tracking-tight mt-4">
                  No workouts on this day
                </Text>
                <Text className="text-slate-400 text-sm tracking-tight mt-1">
                  Select a day with workouts to see details
                </Text>
              </View>
            )
          ) : (
            <View className="bg-white p-8 rounded-2xl shadow-sm items-center">
              <Ionicons name="calendar-outline" size={48} color="#cbd5e1" />
              <Text className="text-slate-500 text-base font-medium tracking-tight mt-4">
                Select a day to view workouts
              </Text>
              <Text className="text-slate-400 text-sm tracking-tight mt-1">
                Choose a date from the calendar above
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
