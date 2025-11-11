import { Exercise } from '@/modules/muscle-group/types/muscle-group.types';
import { Training } from '@/modules/training/types/training.types';
import { format } from 'date-fns';
import { Text, View } from 'react-native';

export interface PersonalRecordCardProps {
  record: Training & { exercise: Exercise };
}

export function PersonalRecordCard({ record }: PersonalRecordCardProps) {
  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm flex-row items-center justify-between">
      <View className="flex-1 gap-1">
        <Text className="text-slate-900 text-base tracking-tight">{record.exercise?.name}</Text>
        <Text className="text-slate-500 text-sm tracking-tight">
          {format(record.date, 'MMM d, yyyy')}
        </Text>
      </View>
      <View className="items-end gap-0.5">
        <Text className="text-slate-900 text-base tracking-tight">{record.weight} kg</Text>
        <Text className="text-slate-500 text-sm tracking-tight">
          {record.sets} sets • {record.reps} reps
        </Text>
      </View>
    </View>
  );
}
