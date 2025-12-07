import { type Exercise } from '@/modules/exercise/types/exercise.types';
import { type Training } from '@/modules/training/types/training.types';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

export interface PersonalRecordCardProps {
  record: Training & { exercise: Exercise };
}

export function PersonalRecordCard({ record }: PersonalRecordCardProps) {
  const description = useMemo(() => {
    if (!record.sessions || record.sessions.length === 0) {
      return 'No sessions recorded';
    }

    const sessionsCount = record.sessions.length;
    const totalReps = record.sessions.reduce((acc, session) => acc + session.reps, 0);
    const avgWeight = getTrainingVolume(record) / totalReps;

    return `${sessionsCount} sessions • ${totalReps} reps • ${avgWeight} kg avg `;
  }, [record]);
  return (
    <View className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center justify-between">
      <View className="flex-1 gap-1">
        <Text className="text-accent text-base tracking-tight">{record.exercise?.name}</Text>
        <Text className="text-body text-sm tracking-tight">
          {format(record.date, 'MMM d, yyyy')}
        </Text>
      </View>
      <View className="items-end gap-0.5">
        <Text className="text-accent text-base tracking-tight">{getTrainingVolume(record)} kg</Text>
        <Text className="text-body text-sm tracking-tight">{description}</Text>
      </View>
    </View>
  );
}
