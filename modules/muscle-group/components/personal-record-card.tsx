import { Text, View } from 'react-native';

export interface PersonalRecord {
  exercise: string;
  date: string;
  weight: string;
  reps: string;
}

export interface PersonalRecordCardProps {
  record: PersonalRecord;
}

export function PersonalRecordCard({ record }: PersonalRecordCardProps) {
  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm flex-row items-center justify-between">
      <View className="flex-1 gap-1">
        <Text className="text-slate-900 text-base tracking-tight">{record.exercise}</Text>
        <Text className="text-slate-500 text-sm tracking-tight">{record.date}</Text>
      </View>
      <View className="items-end gap-0.5">
        <Text className="text-slate-900 text-base tracking-tight">{record.weight}</Text>
        <Text className="text-slate-500 text-sm tracking-tight">{record.reps}</Text>
      </View>
    </View>
  );
}
