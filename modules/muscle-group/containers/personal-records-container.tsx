import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { useTrainingRecordsQuery } from '@/modules/training/hooks/use-training-records-query';
import { PersonalRecordCard } from '../components/personal-record-card';

export interface PersonalRecordsContainerProps {
  muscleGroupId?: string;
}

export function PersonalRecordsContainer({ muscleGroupId }: PersonalRecordsContainerProps) {
  const { data: trainingRecords = [] } = useTrainingRecordsQuery(muscleGroupId);
  console.log('trainingRecords', trainingRecords);
  return (
    <View className="px-4">
      <View className="flex-row items-center gap-2 mb-4">
        <Ionicons name="trophy-outline" size={20} color="#fb923c" />
        <Text className="text-slate-900 text-base tracking-tight">Personal Records</Text>
      </View>

      {trainingRecords.length === 0 ? (
        <View className="bg-white p-6 rounded-3xl shadow-sm items-center justify-center">
          <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="trophy-outline" size={32} color="#f97316" />
          </View>
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-1">
            No personal records yet
          </Text>
          <Text className="text-slate-500 text-sm max-w-[250px] text-center tracking-tight">
            Log workouts to track your personal bests
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          {trainingRecords.map((trainingRecord, index) => (
            <PersonalRecordCard key={index} record={trainingRecord} />
          ))}
        </View>
      )}
    </View>
  );
}
